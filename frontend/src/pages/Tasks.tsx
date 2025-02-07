import { useCallback, useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import Modal from "../components/Model";
import axios from "axios";
interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const fetchTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("https://kazam-assignment-sigma.vercel.app/api/tasks/mytasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="w-[90%] m-auto mt-10">
      <div className="flex gap-4 justify-between items-center">
        <h1 className="text-3xl md:text-xl font-bold">All Tasks</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2ECC71] text-white font-medium px-4 py-1.5 hover:bg-[#6261fd] transition-all duration-700 rounded-2xl cursor-pointer"
        >
          Add a new Task
        </button>
      </div>

      <TaskList tasks={tasks} fetchTasks={fetchTasks} onEdit={handleEditTask} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
      >
        <TaskForm
          fetchTasks={fetchTasks}
          closeModal={() => setIsModalOpen(false)}
          task={selectedTask}
        />
      </Modal>
    </div>
  );
};

export default Tasks;
