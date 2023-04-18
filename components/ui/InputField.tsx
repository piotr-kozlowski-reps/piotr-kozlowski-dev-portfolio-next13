import React, {
  ChangeEvent,
  FormEventHandler,
  forwardRef,
  LegacyRef,
} from "react";
import { TInputFormState } from "../../types/typings";
import clsx from "clsx";

interface Props {
  id: string;
  name: string;
  isTextarea?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inputData: TInputFormState;
}

const InputField = forwardRef(
  (props: Props, ref: LegacyRef<HTMLDivElement> | undefined) => {
    ///vars
    const {
      id,
      name,
      placeholder,
      value,
      onChange,
      onBlur,
      inputData,
      isTextarea,
    } = props;
    const { isValid, isDirty, errorMessage } = inputData;

    ////jsx
    return (
      <div
        className="flex flex-col items-start justify-start w-full pr-16 mb-[8px]"
        ref={ref}
      >
        <div
          className={clsx("font-semibold font-style-formLabels mb-[3px]", {
            "text-error": !isValid && isDirty,
          })}
        >
          {name}
        </div>
        <div
          className={clsx(
            "relative w-full",
            { "h-[62px]": !isTextarea },
            { "h-[198px]": isTextarea }
          )}
        >
          {!isTextarea ? (
            <input
              id={id}
              name={name}
              placeholder={placeholder}
              value={value}
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
              className={clsx(
                "w-full h-[44px] pl-4 border border-transparent outline-none border-b-main_color shadow-input-shadow font-style-formText",
                {
                  "bg-background_1_lighter": !isDirty || (!isValid && !isDirty),
                },
                { "bg-background_2_darker": isValid && isDirty },
                {
                  "bg-error text-white placeholder:text-background_2_darker":
                    !isValid && isDirty,
                }
              )}
            />
          ) : null}

          {isTextarea ? (
            <textarea
              id={id}
              name={name}
              placeholder={placeholder}
              value={value}
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
              className={clsx(
                "w-full h-[198px] pl-4 border border-transparent outline-none border-b-main_color shadow-input-shadow font-style-formText",
                {
                  "bg-background_1_lighter": !isDirty || (!isValid && !isDirty),
                },
                { "bg-background_2_darker": isValid && isDirty },
                {
                  "bg-error text-white placeholder:text-background_2_darker":
                    !isValid && isDirty,
                }
              )}
            ></textarea>
          ) : null}

          {!isValid && isDirty ? (
            <div className="absolute -bottom-[1px] left-0 font-style-xs text-error">
              {errorMessage}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

export default InputField;
