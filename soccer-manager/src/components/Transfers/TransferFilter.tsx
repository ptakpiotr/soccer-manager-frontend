import { Grid, OutlinedInput as Input, InputLabel } from "@mui/material";
import { ITransferFilter } from "../../Types";

type Props<
  T extends { from?: U | undefined; to?: U | undefined },
  U
> = ITransferFilter<T, U>;

function TransferFilter<
  T extends { from?: U | undefined; to?: U | undefined },
  U
>({ filterKey, label, setValue, from, to, validateFilter }: Props<T, U>) {
  const handleChange = (from?: string, to?: string) => {
    if (
      validateFilter &&
      validateFilter({
        from: from as U | undefined,
        to: to as U | undefined,
      })
    ) {
      setValue(filterKey, from as U | undefined, to as U | undefined);
    } 
  };

  

  return (
    <Grid item>
      <InputLabel>{label}</InputLabel>
      <>
        <Input
          size="small"
          type="number"
          value={from}
          onChange={(e) => {
            handleChange(e.target.value, undefined);
          }}
        />{" "}
        -{" "}
        <Input
          size="small"
          type="number"
          value={to}
          onChange={(e) => {
            handleChange(undefined, e.target.value);
          }}
        />
      </>
    </Grid>
  );
}

export default TransferFilter;
