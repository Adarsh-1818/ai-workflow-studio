import { ReactNode } from "react";
import { MessageSquare, Workflow, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex bg-slate-950 text-white">

      {/* Sidebar */}
      <div className="w-[260px] bg-slate-900 border-r border-slate-800 p-4">

        <h1 className="text-2xl font-bold mb-8">
          AI Workflow Studio
        </h1>

        <div className="space-y-2">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/chat")}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
          >
            <MessageSquare size={18} />
            AI Chat
          </button>

          <button
            onClick={() => navigate("/workflow")}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
          >
            <Workflow size={18} />
            Workflow Builder
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

    </div>
  );
};

export default AppLayout;