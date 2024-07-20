import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Trash2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
type SectionInfoSectionProps = {
  data: any;
};

const SectionInfoSection = ({ data }: SectionInfoSectionProps) => {
  const [section, setSection] = useState<{ type: string; value: string }[]>([]);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      fields: [{ type: '', value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const handleAddSection = () => {
    const section = { type: '', value: '' };
    append(section);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className='flex flex-col w-1/2 rounded-xl border bg-card text-card-foreground shadow p-6 mb-10'>
      <h1 className='font-semibold tracking-tight text-xl'>
        Section Information
      </h1>
      <div className='flex flex-col w-full py-4 '>
        <form onSubmit={handleSubmit(onSubmit)} className=' space-y-6'>
          {fields.map((field, index) => (
            <div key={field.id} className='flex w-full gap-3 items-center'>
              <div className='flex flex-col w-full gap-2'>
                <Controller
                  name={`fields.${index}.type`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={() => {
                        field.onChange(field.value);
                        setSection([]);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value='Paragraph'>Paragraph</SelectItem>
                        <SelectItem value='Image'>Image</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {fields[index].type === 'Paragraph' && (
                  <Controller
                    name={`fields.${index}.value`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder='Enter value' />
                    )}
                  />
                )}
              </div>
              <Button
                type='button'
                variant={'destructive'}
                onClick={() => remove(index)}
              >
                <Trash2Icon size={20} />
              </Button>
            </div>
          ))}
          <div
            className='flex flex-col gap-2 justify-center items-center p-6 w-full border-2 border-green-300 border-dashed rounded-lg  cursor-pointer'
            onClick={handleAddSection}
          >
            <PlusCircle size={50} className=' text-gray-400' />
            <h1 className=' text-gray-400'>Add Section</h1>
          </div>
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SectionInfoSection;
