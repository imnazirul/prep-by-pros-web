import * as React from 'react';

import { cn } from '@/lib/utils';
import Icon, { IconName } from '@/lib/icon';
import { CountryDropdown } from '../ui/country-dropdown';
import CustomSelectModal from '../ui/custom-select-modal';
import { Eye } from 'lucide-react';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 file:text-foreground placeholder:text-muted-foreground h-9 w-full min-w-0 rounded-4xl border px-3 py-1 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-[3px] md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

type CustomInputBoxProps = React.ComponentProps<'input'> & {
  label: string;
  icon: IconName;
  isRequired?: boolean;
  isOptional?: boolean;
  isPassword?: boolean;
};

export function CustomInputBox({
  icon,
  type,
  label,
  disabled,
  isRequired = false,
  isOptional = false,
  isPassword = false,
  ...props
}: CustomInputBoxProps) {
  const [showPass, setShowPass] = React.useState('password');

  return (
    <div
      className={cn(
        'has-[input:focus]:ring-ring/50 flex h-16 items-center rounded-full border border-[#D9D9D9] px-4 py-3 has-[input:focus]:ring-0',
        disabled && 'pointer-events-none opacity-65',
      )}
    >
      <div className="mr-2 shrink-0 border-r border-[#F0F0F0] pr-2">
        <Icon
          name={icon}
          height={24}
          width={24}
          className={cn('text-black-8')}
        />
      </div>
      <div className="relative grid flex-1 space-y-0.5">
        <label className="text-black-7 text-sm">
          {label}{' '}
          {(isRequired || isOptional) && (
            <span className="text-black-6">
              ({isOptional ? 'Optional' : 'Required'})
            </span>
          )}
        </label>
        <input
          type={isPassword ? showPass : type}
          className={cn(
            'text-black-10 placeholder:text-black-10 text-lg outline-0',
            isPassword && 'pr-6',
          )}
          data-slot="input"
          {...props}
        />

        {isPassword && (
          <>
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer"
              onClick={() =>
                setShowPass(showPass == 'text' ? 'password' : 'text')
              }
            >
              {showPass == 'password' ? (
                <Icon
                  height={24}
                  width={24}
                  name="eye_off"
                  className="text-black-8"
                />
              ) : (
                <Eye className="text-black-8 size-6" />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

type CustomSelectBoxProps = {
  label: string;
  icon: IconName;
  disabled?: boolean;
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isRequired?: boolean;
  isOptional?: boolean;
};

export function CustomSelectBox({
  icon,
  label,
  disabled,
  placeholder,
  options,
  value,
  setValue,
  isRequired = false,
  isOptional = false,
}: CustomSelectBoxProps) {
  const selectedValue = options.find((option) => option.value === value);

  return (
    <div
      className={cn(
        'has-[input:focus]:ring-ring/50 flex h-16 items-center rounded-full border border-[#D9D9D9] px-4 py-3 has-[input:focus]:ring-0',
        disabled && 'pointer-events-none opacity-65',
      )}
    >
      <div className="mr-2 shrink-0 border-r border-[#F0F0F0] pr-2">
        <Icon
          name={icon}
          height={24}
          width={24}
          className={cn('text-black-8')}
        />
      </div>
      <div className="flex flex-1 items-center justify-between gap-2">
        <div className="grid flex-1 space-y-0.5">
          <label className="text-black-7 text-sm">
            {label}{' '}
            {(isRequired || isOptional) && (
              <span className="text-black-6">
                ({isOptional ? 'Optional' : 'Required'})
              </span>
            )}
          </label>

          <CustomSelectModal
            label={label}
            setValue={setValue}
            value={value}
            options={options}
          >
            <span
              className={cn(
                'text-black-10 text-lg',
                value == '' && 'text-black-10',
              )}
            >
              {value == '' ? placeholder : selectedValue?.label}
            </span>
          </CustomSelectModal>
        </div>
        <Icon
          name="chevron_down_fill"
          height={24}
          width={24}
          className="text-black-8"
        />
      </div>
    </div>
  );
}

type CustomRadioBoxProps = React.ComponentProps<'input'> & {
  label: string;
  icon: IconName;
  options: {
    label: string;
    value: string;
  }[];
  isRequired?: boolean;
  isOptional?: boolean;
};

export function CustomRadioBox({
  icon,
  label,
  disabled,
  options,
  isRequired = false,
  isOptional = false,
  ...props
}: CustomRadioBoxProps) {
  return (
    <div
      className={cn(
        'has-[input:focus]:ring-ring/50 flex h-16 items-center rounded-full border border-[#D9D9D9] px-4 py-3 has-[input:focus]:ring-0',
        disabled && 'pointer-events-none opacity-65',
      )}
    >
      <div className="mr-2 shrink-0 border-r border-[#F0F0F0] pr-2">
        <Icon
          name={icon}
          height={24}
          width={24}
          className={cn('text-black-8')}
        />
      </div>
      <div className="grid flex-1 space-y-0.5">
        <label className="text-black-7 text-sm">
          {label}{' '}
          {(isRequired || isOptional) && (
            <span className="text-black-6">
              ({isOptional ? 'Optional' : 'Required'})
            </span>
          )}
        </label>

        <div className="grid grid-cols-2">
          {options.map((option) => (
            <div key={option.value}>
              <label className="group flex cursor-pointer items-center gap-1">
                <input
                  type="radio"
                  {...props}
                  className="peer accent-primary"
                />
                <span className="text-black-10 text-lg leading-none font-medium">
                  {option.value}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type CustomCountryBoxProps = {
  label: string;
  icon: IconName;
  placeholder: string;
  disabled?: boolean;
  isRequired?: boolean;
  isOptional?: boolean;
};

export function CustomCountryBox({
  icon,
  label,
  disabled,
  isRequired = false,
  isOptional = false,
}: CustomCountryBoxProps) {
  return (
    <div
      className={cn(
        'has-[input:focus]:ring-ring/50 flex h-16 items-center rounded-full border border-[#D9D9D9] px-4 py-3 has-[input:focus]:ring-0',
        disabled && 'pointer-events-none opacity-65',
      )}
    >
      <div className="mr-2 shrink-0 border-r border-[#F0F0F0] pr-2">
        <Icon
          name={icon}
          height={24}
          width={24}
          className={cn('text-black-8')}
        />
      </div>
      <div className="grid flex-1 space-y-0.5">
        <label className="text-black-7 text-sm">
          {label}{' '}
          {(isRequired || isOptional) && (
            <span className="text-black-6">
              ({isOptional ? 'Optional' : 'Required'})
            </span>
          )}
        </label>
        <CountryDropdown placeholder="Select country" defaultValue="USA" />
      </div>
    </div>
  );
}

type CustomTextareaBoxProps = React.ComponentProps<'textarea'> & {
  label: string;
  icon: IconName;
  isRequired?: boolean;
  isOptional?: boolean;
};

export function CustomTextareaBox({
  icon,
  label,
  disabled,
  isRequired = false,
  isOptional = false,
  ...props
}: CustomTextareaBoxProps) {
  return (
    <div
      className={cn(
        'has-[input:focus]:ring-ring/50 flex items-start rounded-4xl border border-[#D9D9D9] px-4 py-3 has-[input:focus]:ring-0',
        disabled && 'pointer-events-none opacity-65',
      )}
    >
      <div className="mr-2 shrink-0 border-r border-[#F0F0F0] pr-2">
        <Icon
          name={icon}
          height={24}
          width={24}
          className={cn('text-black-8')}
        />
      </div>
      <div className="grid flex-1 space-y-0.5">
        <label className="text-black-7 text-sm">
          {label}{' '}
          {(isRequired || isOptional) && (
            <span className="text-black-6">
              ({isOptional ? 'Optional' : 'Required'})
            </span>
          )}
        </label>
        <textarea
          className="text-black-10 placeholder:text-black-10 min-h-40 text-lg outline-0"
          data-slot="input"
          {...props}
        />
      </div>
    </div>
  );
}

export { Input };
