/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "twin.macro";
import { Page, PageContent } from "../shared/Page";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useByIdQuery, useDelete, usePatchMutation } from "../APIs";
import { useForm } from "react-hook-form";
import {
  ErrorMessage,
  FieldsetLegend,
  FormGroup,
  HelperText,
  Label,
  RequiredAsterisk,
} from "../shared/Form";
import { Button, PrimaryButton } from "../shared/Buttons";

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

const GetById = () => {
  const { thingId } = useParams();
  const { status, data } = useByIdQuery(thingId);
  const [typeStatusSelected, setTypeStatusSelected] = useState(data?.type);
  const { mutate } = usePatchMutation(thingId);
  const { mutateAsync: deleteThing } = useDelete();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        type: typeStatusSelected,
      },
      {
        onSuccess: () => {
          navigate("/get");
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
      folder: data?.folder,
      assignedTaskType: data?.assignedTaskType,
      type: data?.type,
    },
  });

  const onRemove = (e) => {
    e.preventDefault();
    deleteThing(thingId);
    navigate("/get");
  };
  return (
    <>
      <Helmet title="Get" />
      <Page>
        <PageContent tw="h-screen">
          <Link
            to={{
              pathname: "/get",
            }}
            tw="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
          >
            <ChevronLeftIcon tw="-ml-2 h-5 w-5 text-gray-900" aria-hidden="true" />
            <span>Retour</span>
          </Link>

          {status === "loading" && "Loading"}
          {status === "error" && "error"}
          {status === "success" && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldsetLegend tw="text-gray-800">Je suis un super titre</FieldsetLegend>
              <HelperText tw="text-gray-500">
                Je suis un super texte qui suggère de créer des choses.
              </HelperText>

              <div tw="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                <FormGroup>
                  <Label htmlFor="folder" tw="text-gray-500">
                    Folder <RequiredAsterisk tw="text-red-500" />
                  </Label>
                  <input
                    tw="flex-1 block w-full text-sm z-0 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                    {...register("folder", {
                      required: "Champs obligatoire",
                    })}
                    type="text"
                    id="folder"
                  />
                  <ErrorMessage>{errors.folder?.message}</ErrorMessage>
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
                        <option key={index} defaultValue={data?.type} value={option._id}>
                          {option.type}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="assignedTaskType" tw="text-gray-500">
                    AssignedTaskType
                  </Label>
                  <textarea
                    tw="flex-1 block w-full text-sm z-0 h-32 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                    {...register("assignedTaskType")}
                    type="text"
                    id="assignedTaskType"
                  />
                </FormGroup>
              </div>
              <div tw="flex space-x-3 items-center justify-end mt-8">
                <Button as={Link} to={"/get"}>
                  Annuler
                </Button>
                <PrimaryButton type="submit">Créer</PrimaryButton>
                <Button tw="bg-red-500 text-white" onClick={onRemove}>
                  Supprimer
                </Button>
              </div>
            </form>
          )}
        </PageContent>
      </Page>
    </>
  );
};

export default GetById;
