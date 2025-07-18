'use server';

/**
 * @fileOverview Room visualization flow using Genkit and Gemini 2.0 Flash image generation.
 *
 * - roomVisualization - A function that handles the room visualization process.
 * - RoomVisualizationInput - The input type for the roomVisualization function.
 * - RoomVisualizationOutput - The return type for the roomVisualization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RoomVisualizationInputSchema = z.object({
  roomPhotoDataUri: z
    .string()
    .describe(
      "A photo of the user's room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  furniturePhotoDataUri: z
    .string()
    .describe(
      'A photo of the furniture item to place in the room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
  description: z.string().describe('The description of the furniture.'),
});
export type RoomVisualizationInput = z.infer<typeof RoomVisualizationInputSchema>;

const RoomVisualizationOutputSchema = z.object({
  visualizedRoom: z
    .string()
    .describe(
      'A photo of the room with the furniture placed in it, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type RoomVisualizationOutput = z.infer<typeof RoomVisualizationOutputSchema>;

export async function roomVisualization(input: RoomVisualizationInput): Promise<RoomVisualizationOutput> {
  return roomVisualizationFlow(input);
}

const roomVisualizationFlow = ai.defineFlow(
  {
    name: 'roomVisualizationFlow',
    inputSchema: RoomVisualizationInputSchema,
    outputSchema: RoomVisualizationOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      // IMPORTANT: ONLY the googleai/gemini-2.0-flash-preview-image-generation model is able to generate images. You MUST use exactly this model to generate images.
      model: 'googleai/gemini-2.0-flash-preview-image-generation',

      prompt: [
        {media: {url: input.roomPhotoDataUri}},
        {
          text:
            'Generate an image of this room with the following furniture item placed in the room: ' +
            input.description,
        },
        {media: {url: input.furniturePhotoDataUri}},
      ],

      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });

    return {visualizedRoom: media!.url!};
  }
);
