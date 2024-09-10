// API_KEY="YOUR_API_KEY"

// # Adjust safety settings in generationConfig below.
// # See https://ai.google.dev/gemini-api/docs/safety-settings
// curl \
//   -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY} \
//   -H 'Content-Type: application/json' \
//   -d @<(echo '{
//   "contents": [

//     {
//       "role": "user",
//       "parts": [
//         {
//           "text": "I had done these tasks back in the day {\"task\": \"Study trees and binary search trees\", \"duration\": \"2 hours\"}, {\"task\": \"Practice sorting algorithms (bubble sort, insertion sort, merge sort)\"\", \"duration\": \"2 hours\"}. So, delete these tasks, and finds new tasks for me"
//         }
//       ]
//     },
//     {
//       "role": "model",
//       "parts": [
//         {
//           "text": "```json\n[{\"task\": \"Review basic data structures (arrays, linked lists, stacks, queues)\", \"duration\": \"2 hours\"}, {\"task\": \"Explore graphs and graph algorithms (DFS, BFS)\", \"duration\": \"2 hours\"}, {\"task\": \"Learn about dynamic programming and common DP problems\", \"duration\": \"2 hours\"}, {\"task\": \"Practice solving algorithmic problems on LeetCode/HackerRank\", \"duration\": \"2 hours\"}]\n\n```"
//         }
//       ]
//     },
//     {
//       "role": "user",
//       "parts": [
//         {
//           "text": "INSERT_INPUT_HERE"
//         }
//       ]
//     }
//   ],
//   "generationConfig": {
//     "temperature": 1,
//     "topK": 64,
//     "topP": 0.95,
//     "maxOutputTokens": 8192,
//     "responseMimeType": "application/json"
//   }
// }')
