import { useState, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useCanvas = () => {
  const canvasRef = useRef(null);
  const [layers, setLayers] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveToHistory = useCallback((newLayers) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLayers)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const addLayer = useCallback((layerData) => {
    const newLayer = {
      id: uuidv4(),
      zIndex: layers.length,
      visible: true,
      ...layerData
    };
    
    const newLayers = [...layers, newLayer];
    setLayers(newLayers);
    setSelectedLayer(newLayer);
    saveToHistory(newLayers);
    
    return newLayer;
  }, [layers, saveToHistory]);

  const updateLayer = useCallback((layerId, updates) => {
    const newLayers = layers.map(layer => 
      layer.id === layerId ? { ...layer, ...updates } : layer
    );
    setLayers(newLayers);
    
    if (selectedLayer?.id === layerId) {
      setSelectedLayer({ ...selectedLayer, ...updates });
    }
  }, [layers, selectedLayer]);

  const deleteLayer = useCallback((layerId) => {
    const newLayers = layers.filter(l => l.id !== layerId);
    setLayers(newLayers);
    
    if (selectedLayer?.id === layerId) {
      setSelectedLayer(null);
    }
    
    saveToHistory(newLayers);
  }, [layers, selectedLayer, saveToHistory]);

  const clearCanvas = useCallback(() => {
    setLayers([]);
    setSelectedLayer(null);
    saveToHistory([]);
  }, [saveToHistory]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setLayers(history[historyIndex - 1]);
      setSelectedLayer(null);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setLayers(history[historyIndex + 1]);
      setSelectedLayer(null);
    }
  }, [history, historyIndex]);

  return {
    canvasRef,
    layers,
    selectedLayer,
    setLayers,
    setSelectedLayer,
    addLayer,
    updateLayer,
    deleteLayer,
    clearCanvas,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1
  };
};