I want to develop an API endpoint for structure an unstructured data. This endpoint accepts unstructured data as string type and required format as an object. This should be fully type safe and as well as I want to use zod for schema validation.

Ex: 

Below API request returns a nicely structured response

{text: "Pet ID P-3921, goes by the name Luna, she's about 2 and a half years old. Breed: Siberian Husky. Female. Description says she's super playful, loves running, pulling sleds, and howling at sirens - very vocal! Needs an active family. Located at 456 Pine Grove Road, Unit 12, Denver, CO 80203. Animal type: Dog.", 

format: {id: string, name: string, age: string, breed: string, gender: string, description: string, address: string, animalType: number}

}

The text can be any string and the format can be any object mentioning their property types. After this has been built, I want to use this service as below steps,

- User uploads a pdf of pet profiles which can contain multiple pet data.

- The text is extracted from the pdf and sends to the API service with the predefined format (
  
  model Pet {
    name               String
    age                String
    breed              String
    gender             Gender           @default(Male)
    description        String
    address            String
    animalType         Animal_Type?     @default(Dog)
    lastVaccinatedDate String?
    healthCondition    Health_Condition @default(Healthy)
  
  )

- console log the structured data.

Tech Stack:

- Next.js

- Typescript

- Prisma ORM

- React Query

- zod

I think that I need to use huggingface xenova/transformers model download and use it for this task. I want you to teach me how to complete this task in the simpleset and the cleanset way in a 7 day plan with achievable goal for each day
