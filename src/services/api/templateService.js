import mockTemplates from '@/services/mockData/templates.json';

class TemplateService {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [...mockTemplates];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const template = mockTemplates.find(t => t.Id === parseInt(id));
    if (!template) {
      throw new Error('Template not found');
    }
    
    return { ...template };
  }

  async getByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    return mockTemplates.filter(t => t.category === category);
  }
}

export const templateService = new TemplateService();