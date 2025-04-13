import { FC } from "react";
import Swal from "sweetalert2";

import Button from "@/components/atoms/button";

export interface CreateMissionPageSectionProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  targetAmount: number;
  setTargetAmount: (targetAmount: number) => void;
  createMission: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const CreateMissionPageSection: FC<CreateMissionPageSectionProps> = ({
  title,
  description,
  targetAmount,
  createMission,
  setTargetAmount,
  setTitle,
  setDescription,
  isLoading,
  setIsLoading,
}) => {
  const _createMission = async () => {
    try {
      setIsLoading(true);
      const res = await createMission();
      console.log("Success: ", res);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Mission created successfully",
      });
      location.reload();
    } catch (error) {
      console.log("Error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 my-4">
      <div className="flex gap-4 items-center">
        <label htmlFor="title" className="font-bold text-lg min-w-[150px]">
          Title :
        </label>
        <input
          type="text"
          id="title"
          className="border rounded-md p-2 w-[50%] bg-white text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex gap-4 items-center">
        <label
          htmlFor="description"
          className="font-bold text-lg min-w-[150px]"
        >
          Description :
        </label>
        <textarea
          rows={8}
          id="description"
          className="border rounded-md p-2 w-[50%] bg-white text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-4 items-center">
        <label htmlFor="target" className="font-bold text-lg min-w-[150px]">
          Target :
        </label>
        <input
          type="number"
          id="target"
          className="border rounded-md p-2 w-[50%] bg-white text-black"
          value={targetAmount}
          onChange={(e) => setTargetAmount(Number(e.target.value))}
        />
      </div>
      <div className="mt-4 md:mt-6 w-[63%] ">
        <Button type="secondary" onClick={_createMission} disabled={isLoading}>
          Create Mission
        </Button>
      </div>
    </div>
  );
};

export default CreateMissionPageSection;
