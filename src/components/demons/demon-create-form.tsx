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
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Demon</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={actions.createDemon}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Demon</h3>
            <Input label="Name" labelPlacement="outside" placeholder="Name" />
            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your demon"
            />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
