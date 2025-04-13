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
    <div className="flex flex-col gap-3 md:gap-6 my-4 w-full">
      <div className="flex flex-col gap-2 md:gap-4 items-left w-full">
        <label htmlFor="title" className="font-bold md:text-lg">
          Title :
        </label>
        <input
          type="text"
          id="title"
          className="border rounded-md p-2 w-full bg-white text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-4 items-left w-full">
        <label
          htmlFor="description"
          className="font-bold md:text-lg min-w-[150px]"
        >
          Description :
        </label>
        <textarea
          rows={5}
          id="description"
          className="border rounded-md p-2 w-full bg-white text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-4 items-left w-full">
        <label htmlFor="target" className="font-bold md:text-lg">
          Target :
        </label>
        <input
          type="number"
          id="target"
          className="border w-full rounded-md p-2 bg-white text-black"
          value={targetAmount}
          onChange={(e) => setTargetAmount(Number(e.target.value))}
        />
      </div>
      <div className="mt-4 md:mt-6 w-full">
        <Button type="secondary" onClick={_createMission} disabled={isLoading}>
          Launch Mission
        </Button>
      </div>
    </div>
  );
};

export default CreateMissionPageSection;
