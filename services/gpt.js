const { Configuration, OpenAIApi } = require("openai");

//configs api with OPENAI_API_KEY key defined in .env file
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function getResponseData(response) {
    try {
        return response.data.choices[0].message;
    } catch(e) {
        console.error(e);
        return null;
    }
}

function getFunctionArguments(data) {
    try {
        return JSON.parse(data.function_call.arguments);
    } catch(e) {
        console.error(e);
        return null;
    }
}

function getCompletionFunctionData(response) {
    try {
        let data = getResponseData(response);
        return getFunctionArguments(data);
    } catch(e) {
        return null;
    }
}

//step 1: get list of dynamic properties and their types
function stepProperties(prompt, temperature) {
    return new Promise(async (resolve, reject) => {
        let properties_prompt = `Consider: "${prompt}"; What are the fields, properties, keys, and components that pertain to the main subject.`;

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-0613",
            messages: [
                {role: "user", content: properties_prompt}
            ],
            temperature: temperature,
            functions: [
                {
                    name: 'propertiesData',
                    parameters: {
                        type: "object",
                        properties: {
                            level_1: {
                                type: 'object',
                                properties: {
                                    main_subject: {
                                        type: 'string'
                                    },
                                    type: {
                                        type: "string",
                                        enum: ["singular", "list"],
                                    },
                                    level_2: {
                                        type: 'array',
                                        items: {
                                            type: "object",

                                            properties:  {
                                                name: {
                                                    type: 'string',
                                                },
                                                type: {
                                                    type: 'string',
                                                },

                                            },
                                            required: ['name', 'type']
                                        }
                                    }
                                },
                                required: ['main_subject', 'type', 'level_2'],
                            },
                        },
                        required: ["level_1"]
                    }
                }
            ],
            function_call: {
                name: 'propertiesData'
            }
        });

        let data = getCompletionFunctionData(completion);

        resolve(data);
    });
}

function getPropertyType(prop) {
    return prop.type;
}

function buildFunctionParameters(properties) {
    let paramsObj = {
        type: 'object',
        properties: {},
        required: [properties.level_1.main_subject]
    };

    let level_1 = properties.level_1;
    let level_2 = properties.level_1.level_2;

    //set main subject
    paramsObj.properties[level_1.main_subject] = {};

    if(level_1.type === 'list') {
        paramsObj.properties[properties.level_1.main_subject].type = 'array';

        let required = level_2.map(x=>x.name.toLowerCase());

        let level2_props = {};

        for(let p of level_2) {
            level2_props[p.name.toLowerCase()] = {
                type: getPropertyType(p.type)
            };
        }

        paramsObj.properties[level_1.main_subject].items = {
            type: 'object',
            required: required,
            properties: level2_props
        };
    }

    return paramsObj;
}

module.exports = {
    organize: function (prompt, functionName, temperature = .7, max_attempts = 3) {
        return new Promise(async (resolve, reject) => {
            for(let attempt = 0; attempt < max_attempts; attempt++) {
                if(attempt >= max_attempts - 1) {
                    console.error("Failed after max attempts.");
                    return reject();
                }

                try {
                    let properties = await stepProperties(prompt, temperature);

                    let parameters = buildFunctionParameters(properties);

                    const completion = await openai.createChatCompletion({
                        model: "gpt-3.5-turbo-0613",
                        messages: [
                            {role: "user", content: prompt}
                        ],
                        temperature: temperature,
                        functions: [
                            {
                                name: functionName,
                                description: `Function for "${prompt}"`,
                                parameters: parameters
                            }
                        ],
                        function_call: {
                            name: functionName
                        }
                    });

                    let data = getCompletionFunctionData(completion);

                    return resolve(data);
                } catch(e) {
                    return reject(e);
                }
            }
        });
    }
};