import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { getCabins } from "../../services/apiCapin";
import { getGuests } from "../../services/apiBookings";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";
import { useCreateBooking } from "./useCreateBooking";
import { useUpdateBooking } from "./useUpdateBooking";
import { useFormLayout } from "../../ui/formLayoutContext";

const StyledFormRow = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 1.2rem;
  }

  ${({ $stacked }) =>
    $stacked &&
    css`
      grid-template-columns: 1fr;
      gap: 0.8rem;
      align-items: stretch;
    `}

  @media (max-width: 768px) {
    ${({ $stacked }) =>
      !$stacked &&
      css`
        grid-template-columns: 1fr;
        gap: 0.8rem;
      `}

    &:has(button) {
      justify-content: stretch;

      & > * {
        flex: 1 1 12rem;
        align-self: stretch;
      }
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const NativeSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  max-width: 100%;
`;

function FormRow({ children, ...rest }) {
  const { isModal } = useFormLayout();
  return (
    <StyledFormRow $stacked={isModal} {...rest}>
      {children}
    </StyledFormRow>
  );
}

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const editId = bookingToEdit?.id;
  const isEditSession = Boolean(editId);

  const { data: guests, isLoading: isLoadingGuests } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  const { data: cabins, isLoading: isLoadingCabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const { createBooking, isPending } = useCreateBooking();
  const { editBooking, isEditing } = useUpdateBooking();
  const isWorking = isPending || isEditing;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? {
          guestId: bookingToEdit.guestId,
          cabinId: bookingToEdit.cabinId,
          startDate: bookingToEdit.startDate?.slice?.(0, 10) ?? "",
          endDate: bookingToEdit.endDate?.slice?.(0, 10) ?? "",
          numGuests: bookingToEdit.numGuests,
          hasBreakfast: bookingToEdit.hasBreakfast ?? false,
          observations: bookingToEdit.observations ?? "",
          isPaid: bookingToEdit.isPaid ?? false,
          status: bookingToEdit.status ?? "unconfirmed",
        }
      : {
          hasBreakfast: false,
          isPaid: false,
          status: "unconfirmed",
        },
  });

  const { errors } = formState;

  function onSubmit(data) {
    const payload = {
      ...data,
      guestId: Number(data.guestId),
      cabinId: Number(data.cabinId),
      numGuests: Number(data.numGuests),
    };

    if (isEditSession) {
      editBooking(
        { newBookingData: payload, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createBooking(payload, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  function onError() {}

  if (isLoadingGuests || isLoadingCabins) {
    return <Spinner />;
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="guestId">Guest</Label>
        <NativeSelect
          id="guestId"
          disabled={isWorking}
          {...register("guestId", { required: "This field is required" })}
        >
          <option value="">Select guest</option>
          {guests?.map((g) => (
            <option key={g.id} value={g.id}>
              {g.fullName} ({g.email})
            </option>
          ))}
        </NativeSelect>
        {errors?.guestId?.message && <Error>{errors?.guestId?.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="cabinId">Cabin</Label>
        <NativeSelect
          id="cabinId"
          disabled={isWorking}
          {...register("cabinId", { required: "This field is required" })}
        >
          <option value="">Select cabin</option>
          {cabins?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </NativeSelect>
        {errors?.cabinId?.message && <Error>{errors?.cabinId?.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="startDate">Start date</Label>
        <Input
          disabled={isWorking}
          type="date"
          id="startDate"
          {...register("startDate", { required: "This field is required" })}
        />
        {errors?.startDate?.message && (
          <Error>{errors?.startDate?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="endDate">End date</Label>
        <Input
          disabled={isWorking}
          type="date"
          id="endDate"
          {...register("endDate", { required: "This field is required" })}
        />
        {errors?.endDate?.message && <Error>{errors?.endDate?.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="numGuests">Number of guests</Label>
        <Input
          disabled={isWorking}
          type="number"
          id="numGuests"
          min={1}
          {...register("numGuests", {
            required: "This field is required",
            min: { value: 1, message: "At least one guest" },
            valueAsNumber: true,
          })}
        />
        {errors?.numGuests?.message && (
          <Error>{errors?.numGuests?.message}</Error>
        )}
      </FormRow>

      {isEditSession && (
        <FormRow>
          <Label htmlFor="status">Status</Label>
          <NativeSelect
            id="status"
            disabled={isWorking}
            {...register("status", { required: "This field is required" })}
          >
            <option value="unconfirmed">Unconfirmed</option>
            <option value="checked-in">Checked in</option>
            <option value="checked-out">Checked out</option>
          </NativeSelect>
          {errors?.status?.message && <Error>{errors?.status?.message}</Error>}
        </FormRow>
      )}

      <FormRow>
        <Label htmlFor="hasBreakfast">Breakfast</Label>
        <div>
          <input
            type="checkbox"
            id="hasBreakfast"
            disabled={isWorking}
            {...register("hasBreakfast")}
          />
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="isPaid">Paid</Label>
        <div>
          <input
            type="checkbox"
            id="isPaid"
            disabled={isWorking}
            {...register("isPaid")}
          />
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="observations">Observations</Label>
        <Textarea
          id="observations"
          disabled={isWorking}
          {...register("observations")}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit booking" : "Create new booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
