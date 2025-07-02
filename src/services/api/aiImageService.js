import mockAIImages from '@/services/mockData/aiImages.json';

class AIImageService {
  async generateImage(prompt, options = {}) {
    // Simulate API delay for AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate occasional failures
    if (Math.random() < 0.1) {
      throw new Error('AI service temporarily unavailable. Please try again.');
    }
    
    // Filter mock images based on prompt keywords
    const keywords = prompt.toLowerCase().split(' ');
    let relevantImages = mockAIImages.filter(img => 
      keywords.some(keyword => 
        img.prompt.toLowerCase().includes(keyword) ||
        img.tags.some(tag => tag.toLowerCase().includes(keyword))
      )
    );
    
    // If no relevant images found, return random selection
    if (relevantImages.length === 0) {
      relevantImages = mockAIImages;
    }
    
    // Return 4 random images from relevant set
    const shuffled = relevantImages.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    
    return selected.map(img => ({
      ...img,
      prompt: prompt, // Override with user's actual prompt
      timestamp: Date.now()
    }));
  }

  async getImageStyles() {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return [
      { id: 'realistic', name: 'Realistic', description: 'Photorealistic images' },
      { id: 'artistic', name: 'Artistic', description: 'Stylized and creative' },
      { id: 'cartoon', name: 'Cartoon', description: 'Fun and animated style' },
      { id: 'abstract', name: 'Abstract', description: 'Abstract and geometric' }
    ];
  }
}

export const aiImageService = new AIImageService();