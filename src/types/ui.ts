import { Dispatch, SetStateAction } from "react";

export interface UIContextType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isSubmitAble: boolean;
  setIsSubmitAble: Dispatch<SetStateAction<boolean>>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}
