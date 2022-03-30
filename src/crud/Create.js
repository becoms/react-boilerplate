/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "twin.macro";
import { usePostMutation } from "../APIs";
import { Button, PrimaryButton } from "../shared/Buttons";
import { Page, PageContent } from "../shared/Page";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import {
  ErrorMessage,
  FieldsetLegend,
  FormGroup,
  HelperText,
  Label,
  RequiredAsterisk,
} from "../shared/Form";

const typeStatus = [
  {
    type: "planned",
  },
  {
    type: "in_progress",
  },
  {
    type: "done",
  },
];

const Create = () => {
  const [typeStatusSelected, setTypeStatusSelected] = useState();

  const { mutate, isLoading: isSaving } = usePostMutation();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        type: typeStatusSelected,
      },
      {
        onSuccess: () => {
          navigate(`/`);
        },
      }
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
    <>
      <Helmet title="Create" />
      <Page>
        <PageContent tw="h-screen">
          <Link
            to={{
              pathname: `/`,
            }}
            tw="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
          >
            <ChevronLeftIcon tw="-ml-2 h-5 w-5 text-gray-900" aria-hidden="true" />
            <span>Retour</span>
          </Link>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldsetLegend tw="text-gray-800">Je suis un super titre</FieldsetLegend>
            <HelperText tw="text-gray-500">
              Je suis un super texte qui suggère de créer des choses.
            </HelperText>

            <div tw="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              <FormGroup>
                <Label htmlFor="name" tw="text-gray-500">
                  Folder <RequiredAsterisk tw="text-red-500" />
                </Label>
                <input
                  tw="flex-1 block w-full text-sm z-0 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                  {...register("name", {
                    required: "Champs obligatoire",
                  })}
                  type="text"
                  id="name"
                />
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
              </FormGroup>

              <FormGroup tw="w-full">
                <Label htmlFor="type" tw="text-gray-500">
                  Type
                </Label>
                <div tw="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    onChange={(e) => {
                      setTypeStatusSelected(e.target.value);
                    }}
                    id="type"
                    name="type"
                    tw="focus:ring-primary-500 focus:border-primary-500 shadow-sm sm:text-sm border-gray-300 rounded-md w-full"
                  >
                    {typeStatus.map((option, index) => (
                      <option key={index} value={option._id}>
                        {option.type}
                      </option>
                    ))}
                  </select>
                </div>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description" tw="text-gray-500">
                  AssignedTaskType
                </Label>
                <textarea
                  tw="flex-1 block w-full text-sm z-0 h-32 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                  {...register("description")}
                  type="text"
                  id="description"
                />
              </FormGroup>
            </div>
            <div tw="flex space-x-3 items-center justify-end mt-8">
              <Button as={Link} to={`/`} disable={isSaving}>
                Annuler
              </Button>
              <PrimaryButton type="submit" disable={isSaving}>
                Créer
              </PrimaryButton>
            </div>
          </form>
        </PageContent>
      </Page>
    </>
  );
};

export default Create;
