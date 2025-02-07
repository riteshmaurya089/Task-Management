import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface TaskFormProps {
  task: { _id: string; title: string; description: string } | null | undefined;
  fetchTasks: () => void;
  closeModal: () => void;
}

const TaskForm = ({ fetchTasks, closeModal, task }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = {
      title,
      description,
    };

    try {
      if (task) {
        const response = await axios.put(
          `https://kazam-assignment-sigma.vercel.app/api/tasks/update/${task._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success(response.data.message);
      } else {
        const response = await axios.post(
          "https://kazam-assignment-sigma.vercel.app/api/tasks/create",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success(response.data.message);
      }

      fetchTasks();
      closeModal();
    } catch {
      toast.error("Error creating task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-5">
        {task ? "Update Task" : "Create New Task"}
      </h2>
      <div>
        <label className="block text-gray-600 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-gray-600 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer p-2 bg-[#2ECC71] hover:bg-[#1abc9c] text-white font-medium rounded-md"
      >
        {task ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default TaskForm;
