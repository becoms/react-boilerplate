/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import tw from "twin.macro";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Page, PageContent, PageHeader, PageSkeleton, PageTitle } from "../Page";
import { PrimaryButton, Button } from "../Buttons";
import { Panel, PanelContent, PanelFooter } from "../Panel";

export const CrudCreation = ({ renderFormFields, listRoute, useUpsertMutation }) => (
  <Page>
    <PageHeader title={<PageTitle>Création</PageTitle>} />
    <PageContent>
      <CrudForm renderFormFields={renderFormFields} listRoute={listRoute} useUpsertMutation={useUpsertMutation} />
    </PageContent>
  </Page>
);

export const CrudDetails = ({ useFindByIdQuery, renderFormFields, listRoute, idPathParam, useUpsertMutation }) => {
  const params = useParams();
  const { status, data: item, error } = useFindByIdQuery(params[idPathParam]);

  return (
    <>
      {status === "loading" && <PageSkeleton />}
      {status === "error" && !item && <div>{error}</div>}
      {status === "success" && item && (
        <Page>
          <PageHeader title={<PageTitle>Détails</PageTitle>} />
          <PageContent>
            <CrudForm item={item} renderFormFields={renderFormFields} listRoute={listRoute} useUpsertMutation={useUpsertMutation} />
          </PageContent>
        </Page>
      )}
    </>
  );
};

/**
 * Item creation or update form wrapped within a Panel.
 * @type {React.FC<{ item?: import("../../items/useItemQueries").Item }>}
 */
export const CrudForm = ({ item = {}, renderFormFields, listRoute, useUpsertMutation }) => {
  const formFields = useMemo(() => renderFormFields(), [renderFormFields]);
  const formProps = useForm({
    defaultValues: item,
  });
  const { mutateAsync: upsertItem, status, data } = useUpsertMutation();
  const onSubmit = async (formValues) => {
    const item = {
      ...formValues,
      _id: formValues._id === "" ? undefined : formValues._id,
    };
    await upsertItem(item);
  };
  const { handleSubmit } = formProps;
  const navigate = useNavigate();

  return (
    <FormProvider {...formProps}>
      {data && <Navigate to={listRoute} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Panel>
          <PanelContent>
            {formFields}
          </PanelContent>
          <PanelFooter>
            <Button type="button" disabled={status === "loading"} onClick={() => navigate(listRoute)}>
              Annuler
            </Button>
            <PrimaryButton type="submit" disabled={status === "loading"}>
              Enregistrer
            </PrimaryButton>
          </PanelFooter>
        </Panel>
      </form>
    </FormProvider>
  );
};
