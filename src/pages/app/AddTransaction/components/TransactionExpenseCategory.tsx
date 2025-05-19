import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@mui/material';
import {
  useCreateCategoryCategoriesPost,
  useRouteCategoriesGet,
} from '@/api/categories/categories';
import SelectInput from '@/components/form/SelectInput';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormWrapper from '@/components/form/FormWrapper';
import TextInput from '@/components/form/TextInput';

const tranzactionSchemaValidation = z.object({
  newExpenseCategory: z.string().min(1, 'Nazwa jest wymagana'),
});

const TransactionExpenseCategory = ({ disabled }: { disabled: boolean }) => {
  const methods = useForm({
    defaultValues: {
      newExpenseCategory: '',
    },
    resolver: zodResolver(tranzactionSchemaValidation),
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const methods = useFormContext();

  // const { mutateAsync: createCategory, isPending: submittingCategory } =
  //   useCreateCategoryCategoriesPost();

  const { data = [] } = useRouteCategoriesGet();
  const { mutateAsync } = useCreateCategoryCategoriesPost();

  const onSubmit = useCallback(
    async (data: z.infer<typeof tranzactionSchemaValidation>) => {
      await mutateAsync({
        data: {
          name: data.newExpenseCategory,
        },
      });
      handleClose();
    },
    [mutateAsync]
  );

  return (
    <>
      <Dialog open={open} onClose={handleClose} title="Dodaj nową kategorię">
        <DialogTitle>Dodaj nową kategorię</DialogTitle>
        <DialogContent sx={{ overflow: 'visible' }}>
          <FormWrapper
            methods={methods}
            sx={{ display: 'grid', gap: '1rem' }}
            onSubmit={onSubmit}
          >
            <TextInput
              name="newExpenseCategory"
              label="Nazwa kategorii"
              disabled={disabled}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="submit"
                variant="text"
                color="primary"
                onClick={handleClose}
              >
                Anuluj
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={disabled}
              >
                Dodaj
              </Button>
            </Box>
          </FormWrapper>
        </DialogContent>
      </Dialog>
      <SelectInput
        name="expenseCategory"
        disabled={disabled}
        options={data.map((v) => ({ value: v.id, label: v.name }))}
        label="Kategorie wydatków"
      >
        {({ currentValue }) => [
          <MenuItem onClick={handleOpen} key="add-new-category">
            <span>Dodaj nową kategorię</span>
          </MenuItem>,
          ...data.map(({ id, name }) => (
            <MenuItem selected={currentValue === id} key={id} value={id}>
              <span>{name}</span>
            </MenuItem>
          )),
        ]}
      </SelectInput>
    </>
  );
};

export default TransactionExpenseCategory;
