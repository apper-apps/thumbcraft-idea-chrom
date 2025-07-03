import React, { useState, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import TopToolbar from '@/components/organisms/TopToolbar';
import TextToolPanel from '@/components/organisms/TextToolPanel';
import AIImagePanel from '@/components/organisms/AIImagePanel';
import ShapePanel from '@/components/organisms/ShapePanel';
import LayerPanel from '@/components/organisms/LayerPanel';
import TemplateModal from '@/components/organisms/TemplateModal';
import Empty from '@/components/ui/Empty';

const DesignCanvas = () => {
  const canvasRef = useRef(null);
  const [layers, setLayers] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Canvas dimensions (YouTube thumbnail size)
  const canvasWidth = 1280;
  const canvasHeight = 720;
  const displayWidth = 640;
  const displayHeight = 360;

  const saveToHistory = useCallback((newLayers) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLayers)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleAddText = (textConfig) => {
    const newLayer = {
      id: uuidv4(),
      type: 'text',
      content: {
        text: textConfig.text,
        fontSize: textConfig.fontSize || 48,
        fontFamily: textConfig.fontFamily || 'Bebas Neue',
        color: textConfig.color || '#FFFFFF',
        bold: textConfig.bold || true,
        italic: textConfig.italic || false,
        outline: textConfig.outline || true,
        outlineColor: textConfig.outlineColor || '#000000',
        outlineWidth: textConfig.outlineWidth || 2,
        shadow: textConfig.shadow || true,
        shadowColor: textConfig.shadowColor || '#000000',
        shadowBlur: textConfig.shadowBlur || 4,
        shadowOffset: textConfig.shadowOffset || { x: 2, y: 2 }
      },
      position: { x: 100, y: 100 },
      size: { width: 400, height: 100 },
      rotation: 0,
      zIndex: layers.length,
      visible: true
    };

    const newLayers = [...layers, newLayer];
    setLayers(newLayers);
    setSelectedLayer(newLayer);
    saveToHistory(newLayers);
    toast.success('Text layer added!');
  };

  const handleAddImage = (imageData) => {
    const newLayer = {
      id: uuidv4(),
      type: 'image',
      content: {
        url: imageData.url,
        alt: imageData.prompt || 'AI Generated Image'
      },
      position: { x: 0, y: 0 },
      size: { width: canvasWidth, height: canvasHeight },
      rotation: 0,
      zIndex: 0, // Background images should be at the bottom
      visible: true
    };

    const newLayers = [...layers, newLayer].sort((a, b) => a.zIndex - b.zIndex);
    setLayers(newLayers);
    setSelectedLayer(newLayer);
    saveToHistory(newLayers);
  };

  const handleAddShape = (shapeConfig) => {
    const newLayer = {
      id: uuidv4(),
      type: 'shape',
      content: {
        shapeType: shapeConfig.shapeType,
        width: shapeConfig.width || 100,
        height: shapeConfig.height || 100,
        fill: shapeConfig.fill || '#FF0000',
        stroke: shapeConfig.stroke || '#000000',
        strokeWidth: shapeConfig.strokeWidth || 2,
        opacity: shapeConfig.opacity || 1
      },
      position: { x: 200, y: 200 },
      size: { width: shapeConfig.width || 100, height: shapeConfig.height || 100 },
      rotation: 0,
      zIndex: layers.length,
      visible: true
    };

    const newLayers = [...layers, newLayer];
    setLayers(newLayers);
    setSelectedLayer(newLayer);
    saveToHistory(newLayers);
    toast.success('Shape added!');
  };

  const handleUpdateLayer = (layerId, updates) => {
    const newLayers = layers.map(layer => 
      layer.id === layerId ? { ...layer, ...updates } : layer
    );
    setLayers(newLayers);
    if (selectedLayer?.id === layerId) {
      setSelectedLayer({ ...selectedLayer, ...updates });
    }
  };

  const handleDeleteLayer = (layer) => {
    const newLayers = layers.filter(l => l.id !== layer.id);
    setLayers(newLayers);
    if (selectedLayer?.id === layer.id) {
      setSelectedLayer(null);
    }
    saveToHistory(newLayers);
    toast.success('Layer deleted');
  };

  const handleToggleVisibility = (layer) => {
    handleUpdateLayer(layer.id, { visible: !layer.visible });
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setLayers(history[historyIndex - 1]);
      setSelectedLayer(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setLayers(history[historyIndex + 1]);
      setSelectedLayer(null);
    }
  };

  const handleClear = () => {
    if (layers.length > 0) {
      if (window.confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
        setLayers([]);
        setSelectedLayer(null);
        saveToHistory([]);
        toast.success('Canvas cleared');
      }
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Create a temporary canvas for export
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = canvasWidth;
      exportCanvas.height = canvasHeight;
      const ctx = exportCanvas.getContext('2d');

      // Fill background with white
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Render layers in order
      const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);
      
      for (const layer of sortedLayers) {
        if (!layer.visible) continue;

        ctx.save();
        
        const x = layer.position.x;
        const y = layer.position.y;
        
        if (layer.rotation) {
          ctx.translate(x + layer.size.width / 2, y + layer.size.height / 2);
          ctx.rotate((layer.rotation * Math.PI) / 180);
          ctx.translate(-layer.size.width / 2, -layer.size.height / 2);
        } else {
          ctx.translate(x, y);
        }

        if (layer.type === 'text') {
          const content = layer.content;
          ctx.font = `${content.bold ? 'bold' : 'normal'} ${content.italic ? 'italic' : 'normal'} ${content.fontSize}px ${content.fontFamily}`;
          ctx.fillStyle = content.color;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          
          if (content.shadow) {
            ctx.shadowColor = content.shadowColor;
            ctx.shadowBlur = content.shadowBlur;
            ctx.shadowOffsetX = content.shadowOffset.x;
            ctx.shadowOffsetY = content.shadowOffset.y;
          }
          
          if (content.outline) {
            ctx.strokeStyle = content.outlineColor;
            ctx.lineWidth = content.outlineWidth;
            ctx.strokeText(content.text, 0, 0);
          }
          
          ctx.fillText(content.text, 0, 0);
        }

        ctx.restore();
      }

      // Export as blob and download
      exportCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `thumbnail-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast.success('Thumbnail exported successfully!');
        setIsExporting(false);
      }, 'image/png', 1);

    } catch (error) {
      toast.error('Failed to export thumbnail');
      setIsExporting(false);
    }
  };

  const handleSelectTemplate = (template) => {
    setLayers(template.layers || []);
    setSelectedLayer(null);
    saveToHistory(template.layers || []);
  };

  const renderLayer = (layer) => {
    if (!layer.visible) return null;

    const style = {
      position: 'absolute',
      left: `${(layer.position.x / canvasWidth) * 100}%`,
      top: `${(layer.position.y / canvasHeight) * 100}%`,
      width: `${(layer.size.width / canvasWidth) * 100}%`,
      height: `${(layer.size.height / canvasHeight) * 100}%`,
      transform: `rotate(${layer.rotation || 0}deg)`,
      zIndex: layer.zIndex,
      cursor: 'pointer',
      border: selectedLayer?.id === layer.id ? '2px solid #FF0000' : 'none'
    };

    if (layer.type === 'text') {
      const content = layer.content;
      const fontSize = (content.fontSize / canvasHeight) * displayHeight;
      
      return (
        <div
          key={layer.id}
          style={{
            ...style,
            fontFamily: content.fontFamily,
            fontSize: `${fontSize}px`,
            fontWeight: content.bold ? 'bold' : 'normal',
            fontStyle: content.italic ? 'italic' : 'normal',
            color: content.color,
            textShadow: content.shadow ? 
              `${content.shadowOffset?.x || 2}px ${content.shadowOffset?.y || 2}px ${content.shadowBlur || 4}px ${content.shadowColor}` : 
              'none',
            WebkitTextStroke: content.outline ? `${content.outlineWidth}px ${content.outlineColor}` : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            wordWrap: 'break-word',
            overflow: 'hidden'
          }}
          onClick={() => setSelectedLayer(layer)}
        >
          {content.text}
        </div>
      );
    }

    if (layer.type === 'image') {
      return (
        <img
          key={layer.id}
          src={layer.content.url}
          alt={layer.content.alt}
          style={style}
          onClick={() => setSelectedLayer(layer)}
          className="object-cover"
        />
      );
    }

    if (layer.type === 'shape') {
      const content = layer.content;
      const shapeStyle = {
        ...style,
        backgroundColor: content.fill,
        border: `${content.strokeWidth}px solid ${content.stroke}`,
        opacity: content.opacity
      };

      let shapeElement;
      switch (content.shapeType) {
        case 'circle':
          shapeElement = <div style={{ ...shapeStyle, borderRadius: '50%' }} />;
          break;
        case 'triangle':
          shapeElement = (
            <div 
              style={{
                ...style,
                width: 0,
                height: 0,
                borderLeft: `${(content.width / canvasWidth) * displayWidth * 0.5}px solid transparent`,
                borderRight: `${(content.width / canvasWidth) * displayWidth * 0.5}px solid transparent`,
                borderBottom: `${(content.height / canvasHeight) * displayHeight}px solid ${content.fill}`,
                backgroundColor: 'transparent'
              }} 
            />
          );
          break;
        default:
          shapeElement = <div style={shapeStyle} />;
      }

      return (
        <div key={layer.id} onClick={() => setSelectedLayer(layer)}>
          {shapeElement}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <TopToolbar
        onUndo={handleUndo}
        onRedo={handleRedo}
        onExport={handleExport}
        onClear={handleClear}
        onOpenTemplates={() => setIsTemplateModalOpen(true)}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        isExporting={isExporting}
      />

<div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Left Sidebar - Tools */}
        <div className="w-full lg:w-80 bg-background border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto max-h-64 lg:max-h-none">
          <div className="p-2 sm:p-4 space-y-2 sm:space-y-4">
            <TextToolPanel
              onAddText={handleAddText}
              selectedLayer={selectedLayer}
              onUpdateLayer={handleUpdateLayer}
            />
            
            <AIImagePanel
              onAddImage={handleAddImage}
            />
            
            <ShapePanel
              onAddShape={handleAddShape}
              selectedLayer={selectedLayer}
              onUpdateLayer={handleUpdateLayer}
            />
            
            <LayerPanel
              layers={layers}
              selectedLayer={selectedLayer}
              onSelectLayer={setSelectedLayer}
              onToggleVisibility={handleToggleVisibility}
              onDeleteLayer={handleDeleteLayer}
              onReorderLayers={setLayers}
              onAddText={() => handleAddText({ text: 'New Text Layer' })}
            />
          </div>
        </div>

{/* Main Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-2 sm:p-4 lg:p-8">
          <div className="relative w-full max-w-4xl">
            <div
              ref={canvasRef}
              className="canvas-container relative bg-white shadow-2xl mx-auto"
              style={{
                width: '100%',
                maxWidth: `${displayWidth}px`,
                aspectRatio: '16/9'
              }}
              onClick={() => setSelectedLayer(null)}
            >
              {layers.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Empty
                    type="canvas"
                    onAction={() => setIsTemplateModalOpen(true)}
                    actionText="Browse Templates"
                  />
                </div>
              ) : (
                layers.map(renderLayer)
              )}
            </div>
            
            {/* Canvas Info */}
            <div className="absolute -bottom-6 sm:-bottom-8 left-0 right-0 flex justify-center">
              <div className="bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg border border-gray-200">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  1280 × 720 pixels • YouTube Thumbnail Size
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
};

export default DesignCanvas;