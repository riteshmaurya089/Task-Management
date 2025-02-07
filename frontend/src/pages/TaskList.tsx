import { useState } from "react";
import Modal from "../components/Model";
import axios from "axios";
import { toast } from "react-toastify";
import { FaClock, FaEdit } from "react-icons/fa";
import { PiCalendarDotsLight } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

const TaskList = ({
  tasks,
  fetchTasks,
  onEdit,
}: {
  tasks: Task[];
  fetchTasks: () => void;
  onEdit: (task: Task) => void;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleMarkCompleted = async (task: Task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found, please log in.");

      await axios.put(
        `https://kazam-assignment-sigma.vercel.app/api/tasks/complete/${task._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!task.completed) {
        toast.warn(`Task "${task.title}" marked as incomplete.`);
      } else {
        toast.success(`Task "${task.title}" marked as completed.`);
      }

      fetchTasks();
    } catch (error) {
      console.error("Error marking task as completed", error);
    }
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, please log in.");
        return;
      }

      const response = await axios.delete(
        `https://kazam-assignment-sigma.vercel.app/api/tasks/delete/${taskToDelete._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(response.data.message);
      fetchTasks(); // Refresh the task list
      setIsDeleteModalOpen(false); // Close modal
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="mt-10 pb-10 grid grid-cols-3 gap-5">
      {tasks.length === 0 ? (
        <div className="text-center mt-40">
          <h1 className="text-2xl font-bold">No tasks added yet</h1>
          <p className="text-gray-600 mt-2">
            Start by adding a new task to keep track of your work.
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="border mt-1 border-gray-100  flex flex-col justify-between py-3 px-5 shadow-sm rounded-md hover:shadow-lg bg-white"
          >
            <div>
              {task.completed ? (
                <div className="py-1 w-[40%]  px-4 bg-green-100 flex gap-2 items-center border rounded border-green-200">
                  <IoCheckmarkDoneCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 text-sm font-semibold">
                    Completed
                  </span>
                </div>
              ) : (
                <div className="py-1 w-[40%] px-4 flex gap-2 items-center border rounded border-yellow-200 bg-amber-100">
                  <FaClock className="h-4 w-4 text-yellow-600" />
                  <span className="text-yellow-600 text-sm font-semibold">
                    Pending
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-xl font-semibold">{task.title}</p>
              <p className="text-gray-600 mt-2">{task.description}</p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <PiCalendarDotsLight className="h-5 w-5" />

                <p className="text-gray-600 text-sm">
                  {new Date(task.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-5">
                <button onClick={() => onEdit(task)} className="cursor-pointer">
                  <FaEdit className="h-5 w-5 text-sky-600 " />
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => handleDeleteClick(task)}
                >
                  <MdDelete className="h-6 w-6 text-red-600" />
                </button>
                <button onClick={() => handleMarkCompleted(task)}>
                  <div>
                    {task.completed === true ? (
                      <IoCheckmarkDoneCircle className="h-6 w-6 text-green-600 cursor-pointer" />
                    ) : (
                      <FaClock className="h-5 w-5 text-yellow-600 cursor-pointer" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <h2 className="text-lg font-bold">Confirm Delete</h2>
        <p className="mt-2">
          Are you sure you want to delete <b>{taskToDelete?.title}</b>?
        </p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TaskList;
