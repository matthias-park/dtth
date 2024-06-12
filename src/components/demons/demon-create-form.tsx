"use client";

import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import * as actions from "@/actions";

export default function DemonCreateForm() {
  const [formState, action] = useFormState(actions.createDemon, {
    errors: {},
  });
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Demon</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Demon</h3>
            <Input
              name="url"
              label="URL"
              labelPlacement="outside"
              placeholder="Their URL"
              isInvalid={!!formState.errors.url}
              errorMessage={formState.errors.url?.join(", ")}
            />
            <Textarea
              name="comment"
              label="Comment"
              labelPlacement="outside"
              placeholder="Comment on your demon"
              isInvalid={!!formState.errors.comment}
              errorMessage={formState.errors.comment?.join(", ")}
            />

            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
