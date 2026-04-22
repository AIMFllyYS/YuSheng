"use client";
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { 
    id: '1', 
    position: { x: 250, y: 100 }, 
    data: { label: 'Phase 1: 全局功能�?(完成)' }, 
    style: { background: 'rgba(34,197,94,0.2)', color: 'white', border: '1px solid #22c55e', borderRadius: '8px', padding: '10px 20px', backdropFilter: 'blur(10px)' } 
  },
  { 
    id: '2', 
    position: { x: 250, y: 250 }, 
    data: { label: 'Phase 2: 轨迹与时间融�?(进行�?' }, 
    style: { background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid var(--accent-main)', borderRadius: '8px', padding: '10px 20px', backdropFilter: 'blur(10px)' } 
  },
  { 
    id: '3', 
    position: { x: 250, y: 400 }, 
    data: { label: 'Phase 3: 知识库与HTML打�? }, 
    style: { background: 'rgba(0,0,0,0.5)', color: 'gray', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '8px', padding: '10px 20px' } 
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'var(--accent-main)' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: 'gray', strokeDasharray: '5,5' } },
];

export function RoadmapView() {
  return (
    <div className="w-full h-full pt-16 relative z-10">
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView colorMode="dark">
        <Background color="rgba(255,255,255,0.1)" gap={20} />
        <Controls style={{ fill: 'white' }} />
        <MiniMap nodeStrokeColor={() => 'var(--accent-main)'} nodeColor={() => 'rgba(255,255,255,0.1)'} maskColor="rgba(0,0,0,0.6)" style={{ background: '#0a0f1a' }} />
      </ReactFlow>
    </div>
  );
}
