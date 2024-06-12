'use client';

import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import * as actions from '@/actions';

export default function DemonCreateForm() {
  const [formState, action] = useFormState(actions.createDemon, {
    errors: {}
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
            <Input name="url" label="URL" labelPlacement="outside" placeholder="Their URL" />
            <Textarea
              name="comment"
              label="Comment"
              labelPlacement="outside"
              placeholder="Comment on your demon"
            />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
