# ChatGPT - Dynamic Structured Output

This simple NodeJS repo uses ChatGPT's new function_call feature to build dynamic and structured data from any input prompt. 

## Installation
```
git clone https://github.com/egekhter/gpt-structured.git
cd gpt-structured
npm install 
```

### OPENAI_API_KEY
1. Create .env file in main project directory 
2. Add OPENAI_API_KEY from https://platform.openai.com/account/api-keys

```
OPENAI_API_KEY=
```

### Run

```
node main.js
```

### Example Prompt

_What are the 10 best movies from 1990 to 2000? Include actors and plot._

#### Output
```json
{
  "movies": [
    {
      "title": "The Shawshank Redemption",
      "year": 1994,
      "actors": [
        "Tim Robbins",
        "Morgan Freeman"
      ],
      "plot": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    {
      "title": "Pulp Fiction",
      "year": 1994,
      "actors": [
        "John Travolta",
        "Samuel L. Jackson",
        "Uma Thurman"
      ],
      "plot": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    },
    {
      "title": "The Matrix",
      "year": 1999,
      "actors": [
        "Keanu Reeves",
        "Laurence Fishburne",
        "Carrie-Anne Moss"
      ],
      "plot": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
    },
    {
      "title": "Fight Club",
      "year": 1999,
      "actors": [
        "Brad Pitt",
        "Edward Norton",
        "Helena Bonham Carter"
      ],
      "plot": "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more."
    },
    {
      "title": "Forrest Gump",
      "year": 1994,
      "actors": [
        "Tom Hanks",
        "Robin Wright",
        "Gary Sinise"
      ],
      "plot": "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart."
    },
    {
      "title": "The Silence of the Lambs",
      "year": 1991,
      "actors": [
        "Jodie Foster",
        "Anthony Hopkins"
      ],
      "plot": "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims."
    },
    {
      "title": "Goodfellas",
      "year": 1990,
      "actors": [
        "Robert De Niro",
        "Ray Liotta",
        "Joe Pesci"
      ],
      "plot": "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate."
    },
    {
      "title": "The Usual Suspects",
      "year": 1995,
      "actors": [
        "Kevin Spacey",
        "Gabriel Byrne",
        "Chazz Palminteri"
      ],
      "plot": "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup."
    },
    {
      "title": "American Beauty",
      "year": 1999,
      "actors": [
        "Kevin Spacey",
        "Annette Bening",
        "Thora Birch"
      ],
      "plot": "A sexually frustrated suburban father has a mid-life crisis after becoming infatuated with his daughter's best friend."
    },
    {
      "title": "Saving Private Ryan",
      "year": 1998,
      "actors": [
        "Tom Hanks",
        "Matt Damon",
        "Tom Sizemore"
      ],
      "plot": "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action."
    }
  ]
}
```


