import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
  
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for location : Las vegas,for 3 days for couple with a cheap budget,give me a hotels options list with hotelname,hotel address,price,hotel image url,geo coordinates,rating,descriptions and suggest itinerary with placeName,Place Details, Place Image url,Geo coordinates,ticket Pricing,rating,time travel each of the location for 3 days with each day plan with best time to visit in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotels\": [\n    {\n      \"name\": \"The D Las Vegas\",\n      \"address\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50-$100 per night\",\n      \"imageUrl\": \"https://www.the-d.com/media/img/hotel-exterior-mobile.jpg\",\n      \"geoCoordinates\": [36.1699, -115.1423],\n      \"rating\": 4.0,\n      \"description\": \"A budget-friendly hotel located in the heart of Fremont Street Experience, offering rooms with basic amenities and access to the vibrant downtown scene.\"\n    },\n    {\n      \"name\": \"The Golden Nugget\",\n      \"address\": \"129 E Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$70-$150 per night\",\n      \"imageUrl\": \"https://www.goldennugget.com/images/homepage/goldennuggetlasvegas_hero_mobile.jpg\",\n      \"geoCoordinates\": [36.1692, -115.1416],\n      \"rating\": 4.5,\n      \"description\": \"A historic hotel with a modern twist, featuring a casino, several restaurants, and the famous shark tank.\"\n    },\n    {\n      \"name\": \"Circus Circus Hotel & Casino\",\n      \"address\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$40-$80 per night\",\n      \"imageUrl\": \"https://www.circuscircus.com/media/images/circus-circus-hotel-las-vegas.jpg\",\n      \"geoCoordinates\": [36.0991, -115.1730],\n      \"rating\": 3.5,\n      \"description\": \"A budget-friendly hotel known for its circus theme, arcade, and affordable dining options.\"\n    },\n    {\n      \"name\": \"The Orleans Hotel & Casino\",\n      \"address\": \"4500 W Tropicana Ave, Las Vegas, NV 89103\",\n      \"price\": \"$60-$120 per night\",\n      \"imageUrl\": \"https://www.orleanscasino.com/media/images/exterior-images/orleans-casino-hotel-las-vegas-exterior.jpg\",\n      \"geoCoordinates\": [36.0783, -115.2108],\n      \"rating\": 4.0,\n      \"description\": \"A comfortable hotel with a relaxed atmosphere, offering multiple dining options, a casino, and a pool.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": \"Day 1\",\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"Downtown Las Vegas's vibrant pedestrian mall featuring a canopy of lights, live music, street performers, and a zipline.\",\n          \"placeImageUrl\": \"https://www.visitlasvegas.com/sites/default/files/styles/blog_feature_image/public/2022-06/FremontStreetExperience_01.jpg\",\n          \"geoCoordinates\": [36.1699, -115.1423],\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"time\": \"Evening (6:00 PM - 10:00 PM)\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"plan\": [\n        {\n          \"placeName\": \"The Strip\",\n          \"placeDetails\": \"Las Vegas's iconic boulevard lined with world-renowned casinos, hotels, and attractions.\",\n          \"placeImageUrl\": \"https://www.visitlasvegas.com/sites/default/files/styles/blog_feature_image/public/2022-04/Las-Vegas-Strip-Aerial-View.jpg\",\n          \"geoCoordinates\": [36.1146, -115.1729],\n          \"ticketPricing\": \"Free\",\n          \"rating\": 5.0,\n          \"time\": \"Daytime (10:00 AM - 4:00 PM)\"\n        },\n        {\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"A stunning indoor garden showcasing seasonal floral displays and sculptures.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/content/dam/bellagio/images/conservatory/2023/2023-11/Bellagio-Conservatory-and-Botanical-Garden-Fall-2023.jpg\",\n          \"geoCoordinates\": [36.1155, -115.1739],\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.8,\n          \"time\": \"Afternoon (2:00 PM - 4:00 PM)\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 3\",\n      \"plan\": [\n        {\n          \"placeName\": \"Hoover Dam\",\n          \"placeDetails\": \"A historic dam and engineering marvel located just outside Las Vegas, offering guided tours and scenic views.\",\n          \"placeImageUrl\": \"https://www.nps.gov/hdam/learn/management/images/IMG_2480.jpg\",\n          \"geoCoordinates\": [36.0062, -114.9647],\n          \"ticketPricing\": \"Around $30 for a guided tour\",\n          \"rating\": 4.6,\n          \"time\": \"Morning (9:00 AM - 12:00 PM)\"\n        },\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"A scenic desert landscape with hiking trails, rock formations, and wildlife viewing opportunities.\",\n          \"placeImageUrl\": \"https://www.nps.gov/redr/planyourvisit/images/RedRock_IMG_4526.jpg\",\n          \"geoCoordinates\": [36.1619, -115.3702],\n          \"ticketPricing\": \"Entrance fee of $15 per vehicle\",\n          \"rating\": 4.7,\n          \"time\": \"Afternoon (1:00 PM - 5:00 PM)\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Explanation:**\n\nThis JSON structure provides a comprehensive travel plan for a budget-conscious couple visiting Las Vegas for 3 days.\n\n**Hotels:**\n\n* It lists 4 affordable hotels in Las Vegas, providing details like name, address, price range, image URL, geographic coordinates, ratings, and descriptions.\n\n**Itinerary:**\n\n* The itinerary is divided into 3 days, each outlining a suggested plan with specific locations to visit.\n* For each location, it includes:\n    * **placeName**: The name of the place.\n    * **placeDetails**: A brief description of the place.\n    * **placeImageUrl**: An image URL showcasing the place.\n    * **geoCoordinates**: Coordinates to help locate the place on a map.\n    * **ticketPricing**: Estimated ticket price or entrance fee.\n    * **rating**: A general rating based on visitor reviews (from 1 to 5).\n    * **time**: Suggested time of day for visiting the place.\n\n**Key Considerations:**\n\n* **Transportation:** You can use public transport like buses or the monorail for economical travel within Las Vegas.\n* **Food:** Opt for affordable dining options like buffets, food trucks, or casual eateries to stay within budget.\n* **Entertainment:** Look for free shows on the Strip or Fremont Street, and take advantage of happy hour deals.\n* **Flexibility:** This itinerary is just a suggestion, feel free to customize it based on your interests and preferences.\n\n**Remember:** Prices and availability may vary, so it's always best to check online and book in advance to secure the best deals. Enjoy your trip!\n"},
          ],
        },
      ],
    });
  
    
  
  
  