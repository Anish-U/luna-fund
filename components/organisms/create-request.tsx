import { FC } from "react";
import Swal from "sweetalert2";

import Button from "@/components/atoms/button";

export interface CreateRequestPageSectionProps {
  description: string;
  setDescription: (description: string) => void;
  amount: number;
  setAmount: (targetAmount: number) => void;
  recipient: string;
  setRecipient: (recipient: string) => void;
  createRequest: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const CreateRequestPageSection: FC<CreateRequestPageSectionProps> = ({
  description,
  setDescription,
  amount,
  setAmount,
  recipient,
  setRecipient,
  createRequest,
  isLoading,
  setIsLoading,
}) => {
  const _createRequest = async () => {
    try {
      setIsLoading(true);
      const res = await createRequest();
      console.log("Success: ", res);
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Request created successfully",
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
          Recipient Address :
        </label>
        <input
          type="text"
          id="title"
          className="border rounded-md p-2 w-full bg-white text-black"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
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
          Amount for Withdraw :
        </label>
        <input
          type="number"
          id="target"
          className="border w-full rounded-md p-2 bg-white text-black"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <div className="mt-4 md:mt-6 w-full">
        <Button type="primary" onClick={_createRequest} disabled={isLoading}>
          Raise Withdrawal Request
        </Button>
      </div>
    </div>
  );
};

export default CreateRequestPageSection;
