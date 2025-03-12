import React, { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import OptionalLabel from '@/components/forms/optional-label';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

function formatCurrency(value: string | null) {
  if (value == null) {
    return '';
  }
  return value
    .replace(/,/g, '') // カンマの削除
    .replace(/(?<!\.\d*?)(\d)(?=(\d{3})+(?!\d))/g, '$1,'); // 小数部以外を3桁カンマ区切りにする
}

export type CurrencyFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  ComponentPropsWithoutRef<typeof Input>,
  'type' | 'name' | 'value' | 'onChange' | 'onBlur'
> & {
  name: TName;
  label?: string;
  placeholder?: string;
  description?: string;
  hasValueChangedFeedback?: boolean;
  onChangeFieldValue?: ChangeEventHandler<HTMLInputElement>;
};

export function CurrencyFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  placeholder,
  description,
  required,
  disabled,
  hasValueChangedFeedback,
  onChangeFieldValue,
  className,
  ...props
}: CurrencyFormFieldProps<TFieldValues, TName>) {
  const ctx = useFormContext<TFieldValues>();

  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field: { value: fieldValue, ...field }, formState, fieldState }) => {
        return (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                {!required && <OptionalLabel className="ml-1" />}
              </FormLabel>
            )}
            <FormControl>
              <Input
                type="text"
                placeholder={placeholder}
                inputMode="decimal"
                disabled={field.disabled || formState.isSubmitting || disabled}
                {...props}
                value={formatCurrency(fieldValue)}
                onChange={(event) => {
                  const amount = formatCurrency(event.target.value);
                  field.onChange(amount.replaceAll(',', ''));
                  onChangeFieldValue?.(event);
                }}
                className={cn(
                  hasValueChangedFeedback && fieldState.isDirty && 'bg-warning',
                  className,
                )}
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
