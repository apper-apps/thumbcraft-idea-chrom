export const exportCanvas = async (layers, dimensions = { width: 1280, height: 720 }) => {
  return new Promise((resolve, reject) => {
    try {
      // Create a temporary canvas for export
      const canvas = document.createElement('canvas');
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      const ctx = canvas.getContext('2d');

      // Fill background with white
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Sort layers by zIndex
      const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);

      // Render each layer
      const renderPromises = sortedLayers.map(layer => {
        return new Promise((layerResolve) => {
          if (!layer.visible) {
            layerResolve();
            return;
          }

          ctx.save();

          const x = layer.position.x;
          const y = layer.position.y;

          // Apply transformations
          if (layer.rotation) {
            ctx.translate(x + layer.size.width / 2, y + layer.size.height / 2);
            ctx.rotate((layer.rotation * Math.PI) / 180);
            ctx.translate(-layer.size.width / 2, -layer.size.height / 2);
          } else {
            ctx.translate(x, y);
          }

          if (layer.type === 'text') {
            renderTextLayer(ctx, layer);
            layerResolve();
          } else if (layer.type === 'image') {
            renderImageLayer(ctx, layer, layerResolve);
          } else if (layer.type === 'shape') {
            renderShapeLayer(ctx, layer);
            layerResolve();
          } else {
            layerResolve();
          }

          ctx.restore();
        });
      });

      // Wait for all layers to render
      Promise.all(renderPromises).then(() => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png', 1);
      });

    } catch (error) {
      reject(error);
    }
  });
};

const renderTextLayer = (ctx, layer) => {
  const content = layer.content;
  
  // Set font properties
  ctx.font = `${content.bold ? 'bold' : 'normal'} ${content.italic ? 'italic' : 'normal'} ${content.fontSize}px ${content.fontFamily}`;
  ctx.fillStyle = content.color;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // Apply shadow if enabled
  if (content.shadow) {
    ctx.shadowColor = content.shadowColor;
    ctx.shadowBlur = content.shadowBlur;
    ctx.shadowOffsetX = content.shadowOffset?.x || 0;
    ctx.shadowOffsetY = content.shadowOffset?.y || 0;
  }

  // Apply outline if enabled
  if (content.outline && content.outlineWidth > 0) {
    ctx.strokeStyle = content.outlineColor;
    ctx.lineWidth = content.outlineWidth;
    ctx.strokeText(content.text, 0, 0);
  }

  // Render the text
  ctx.fillText(content.text, 0, 0);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
};

const renderImageLayer = (ctx, layer, callback) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  img.onload = () => {
    ctx.drawImage(img, 0, 0, layer.size.width, layer.size.height);
    callback();
  };
  
  img.onerror = () => {
    // If image fails to load, render a placeholder
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, layer.size.width, layer.size.height);
    ctx.fillStyle = '#999';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Image not found', layer.size.width / 2, layer.size.height / 2);
    callback();
  };
  
  img.src = layer.content.url;
};

const renderShapeLayer = (ctx, layer) => {
  const content = layer.content;
  
  ctx.globalAlpha = content.opacity || 1;
  ctx.fillStyle = content.fill;
  ctx.strokeStyle = content.stroke;
  ctx.lineWidth = content.strokeWidth || 0;

  switch (content.shapeType) {
    case 'rectangle':
      ctx.fillRect(0, 0, layer.size.width, layer.size.height);
      if (content.strokeWidth > 0) {
        ctx.strokeRect(0, 0, layer.size.width, layer.size.height);
      }
      break;
      
    case 'circle':
      const radius = Math.min(layer.size.width, layer.size.height) / 2;
      ctx.beginPath();
      ctx.arc(layer.size.width / 2, layer.size.height / 2, radius, 0, 2 * Math.PI);
      ctx.fill();
      if (content.strokeWidth > 0) {
        ctx.stroke();
      }
      break;
      
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(layer.size.width / 2, 0);
      ctx.lineTo(0, layer.size.height);
      ctx.lineTo(layer.size.width, layer.size.height);
      ctx.closePath();
      ctx.fill();
      if (content.strokeWidth > 0) {
        ctx.stroke();
      }
      break;
      
    default:
      // Default to rectangle for unknown shapes
      ctx.fillRect(0, 0, layer.size.width, layer.size.height);
      if (content.strokeWidth > 0) {
        ctx.strokeRect(0, 0, layer.size.width, layer.size.height);
      }
  }
  
  ctx.globalAlpha = 1;
};

export const downloadBlob = (blob, filename = 'thumbnail.png') => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};