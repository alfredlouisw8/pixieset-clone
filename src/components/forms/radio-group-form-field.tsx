import React from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export type RadioGroupFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label?: string;
  description?: string;
  options: { value: string; label: string; description?: string }[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export function RadioGroupFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  options,
  required,
  disabled,
  className,
}: RadioGroupFormFieldProps<TFieldValues, TName>) {
  const ctx = useFormContext<TFieldValues>();

  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field, formState }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              {...field}
              disabled={formState.isSubmitting || disabled}
              className="gap-2"
              onValueChange={field.onChange}
            >
              {options.map((option) => (
                <div key={option.value}>
                  <div className="flex items-center space-x-2 rounded border p-3">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <label htmlFor={option.value} className="cursor-pointer text-sm">
                      {option.label}
                    </label>
                  </div>

                  {option.description && (
                    <span className="text-xs text-gray-400">{option.description}</span>
                  )}
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
