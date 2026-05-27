import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold">Dashboard 🚀</h1>

      <p className="text-gray-400 mt-2">
        Choose a feature to continue
      </p>

      <div className="grid grid-cols-2 gap-6 mt-10">

        <motion.div
          onClick={() => navigate("/chat")}
          whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="bg-slate-900 p-6 rounded-xl cursor-pointer"
        >
          <h2 className="text-xl font-semibold">AI Chat</h2>
          <p className="text-gray-400">Talk with AI</p>
        </motion.div>

        <motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="bg-slate-900 p-6 rounded-xl cursor-pointer"
>
          <h2 className="text-xl font-semibold">Prompt Library</h2>
          <p className="text-gray-400">Save prompts (next step)</p>
          </motion.div>

        <motion.div
  onClick={() => navigate("/workflow")}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="bg-slate-900 p-6 rounded-xl cursor-pointer"
>
  <h2 className="text-xl font-semibold">
    Workflow Builder
  </h2>

  <p className="text-gray-400">
    Build AI pipelines visually
  </p>
</motion.div>

      </div>
    </div>
    </AppLayout>
  );
};

export default DashboardPage;