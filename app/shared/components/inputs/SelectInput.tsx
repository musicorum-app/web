import { Select as RSelect } from '@radix-ui/themes'
import { SelectRootProps, SelectTriggerProps } from '@radix-ui/themes/dist/cjs/components/select'
import { ReactNode } from 'react'

interface SelectProps extends SelectRootProps {
  placeholder?: string
  children: ReactNode
}

export default function SelectInput(props: SelectProps) {
  const { placeholder, children, ...rootProps } = props

  return <RSelect.Root {...rootProps}>
    <RSelect.Trigger placeholder={placeholder} />
    <RSelect.Content>
      {children}
    </RSelect.Content>
  </RSelect.Root>
}