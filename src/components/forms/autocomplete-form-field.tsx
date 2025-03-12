import React, { ComponentPropsWithoutRef } from 'react';
import { FieldPath, FieldPathValue, FieldValues, useFormContext } from 'react-hook-form';

import { Autocomplete, AutocompleteItem } from '@/components/forms/autocomplete';
import OptionalLabel from '@/components/forms/optional-label';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

export type AutocompleteFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends any = any,
> = Omit<
  ComponentPropsWithoutRef<typeof Autocomplete<TValue>>,
  'name' | 'value' | 'onChange' | 'onSelect' | 'onBlur'
> & {
  name: TName;
  label?: string;
  description?: string;
  hasValueChangedFeedback?: boolean;
  onChangeFieldValue?: (item: AutocompleteItem<TValue> | null) => void;
};

export function AutocompleteFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends FieldPathValue<TFieldValues, TName> = FieldPathValue<TFieldValues, TName>,
>({
  name,
  label,
  description,
  required,
  disabled,
  hasValueChangedFeedback,
  onChangeFieldValue,
  className,
  ...props
}: AutocompleteFormFieldProps<TFieldValues, TName, TValue>) {
  const ctx = useFormContext<TFieldValues>();

  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field: { onChange, ...field }, formState, fieldState }) => {
        return (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                {!required && <OptionalLabel className="ml-1" />}
              </FormLabel>
            )}
            <FormControl>
              <Autocomplete
                disabled={formState.isSubmitting || disabled}
                {...props}
                onChange={(value) => {
                  onChange(value);
                  if (value !== field.value) {
                    onChangeFieldValue?.(null);
                  }
                }}
                onSelect={onChangeFieldValue}
                className={cn(
                  hasValueChangedFeedback && fieldState.isDirty && 'bg-warning',
                  className,
                )}
                {...field}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
