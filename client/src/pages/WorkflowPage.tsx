import ReactFlow, {
    Background,
    Controls,
    MiniMap,
  } from "reactflow";
  
  import "reactflow/dist/style.css";
  import AppLayout from "../components/AppLayout";
  
  const initialNodes = [
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: { label: "User Prompt" },
      type: "input",
    },
  
    {
      id: "2",
      position: { x: 400, y: 100 },
      data: { label: "AI Processing" },
    },
  
    {
      id: "3",
      position: { x: 700, y: 100 },
      data: { label: "Output" },
      type: "output",
    },
  ];
  
  const initialEdges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
    },
  
    {
      id: "e2-3",
      source: "2",
      target: "3",
    },
  ];
  
  const WorkflowPage = () => {
    return (
        <AppLayout>
      <div className="h-screen bg-slate-950">
      <div className="absolute top-4 right-4 z-10 flex gap-3">
  <button className="bg-violet-600 px-4 py-2 rounded-lg">
    Save Workflow
  </button>

  <button className="bg-slate-800 px-4 py-2 rounded-lg">
    Run
  </button>
</div>
        <div className="p-4 text-white text-2xl font-bold border-b border-slate-800">
          AI Workflow Builder
        </div>
  
        <div className="h-[calc(100vh-80px)]">
  
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
  
        </div>
      </div>
      </AppLayout>
    );
  };
  
  export default WorkflowPage;