"use client";

import { useState } from "react";
import { Store } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/useStoreModal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}
export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const [open, setOpen] = useState(false);
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
 

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          className={cn("w-[200px] justify-between", className)}
          role="combobox"
          aria-expanded={open}
          variant={"outline"}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto shrink-0 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command >
          <CommandInput placeholder="Search store..."></CommandInput>
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandGroup heading={"Stores"}>
            {formattedItems.map((store) => (
              <CommandItem
                key={store.value}
                className="flex items-center"
                onSelect={() => onStoreSelect(store)}
              >
                <StoreIcon className="mr-2 h-4 w-4" />
                {store.label}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    currentStore?.value === store.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
            <CommandSeparator />
            <CommandList>
                <CommandGroup>
                    <CommandItem 
                     onSelect={() => {
                        setOpen(false);
                        storeModal.onOpen();
                     }}
                    >
                        <PlusCircle className="mr-2 h-5 w-5"/>
                        Create Store
                    </CommandItem>
                </CommandGroup>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
