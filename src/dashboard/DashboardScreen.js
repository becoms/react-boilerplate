/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import tw from "twin.macro";
import { Page, PageContent, PageHeader, PageTitle } from "../shared/Page";
import { Card } from "../shared/Card";
import { Button, PrimaryButton } from "../shared/Buttons";
import { CheckBox, ErrorMessage, FormGroup, HelperText, Input, Label, Select, TextArea } from "../shared/Form";
import styled from "@emotion/styled";

export const DashboardScreen = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet title={t("Dashboard.title")} />
      <Page>
        <PageHeader title={<PageTitle>{t("Dashboard.title")}</PageTitle>} />
        <PageContent tw="flex flex-col gap-3">
          <Card>
            <section tw="rounded-lg h-auto p-3">
              <CardTitle>Buttons</CardTitle>
              <hr tw="mt-3 mb-5" />
              <ComponentContainer><ComponentLabel>Button</ComponentLabel><Button>OK</Button></ComponentContainer>
              <ComponentContainer><ComponentLabel>PrimaryButton</ComponentLabel><PrimaryButton>OK</PrimaryButton></ComponentContainer>
            </section>
          </Card>
          <Card>
            <section tw="rounded-lg h-auto p-3">
              <CardTitle>Card</CardTitle>
              <hr tw="mt-3 mb-5" />
              <ComponentContainer><ComponentLabel>Card</ComponentLabel>
                <Card>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. <ComponentContainer>Sed vel velit dapibus elit ornare congue sit amet sit amet eros. </ComponentContainer>
                </Card>
              </ComponentContainer>
            </section>
          </Card>
          <Card>
            <section tw="rounded-lg h-auto p-3">
              <CardTitle>Form</CardTitle>
              <hr tw="mt-3 mb-5" />
              <ComponentContainer>
                <ComponentLabel>Label</ComponentLabel>
                <Label>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Label>
              </ComponentContainer>
              <ComponentContainer>
                <ComponentLabel>Input type=&quot;text&quot;</ComponentLabel>
                <Input type="text" value="Lorem ipsum dolor sit amet" onChange={() => {}} />
              </ComponentContainer>
              <ComponentContainer>
                <ComponentLabel>CheckBox type=&quot;checkbox&quot;</ComponentLabel>
                <CheckBox type="checkbox" value="Lorem ipsum dolor sit amet" onChange={() => {}} checked />
              </ComponentContainer>
              <ComponentContainer>
                <ComponentLabel>TextArea</ComponentLabel>
                <TextArea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
              </ComponentContainer>
              <ComponentContainer>
                <ComponentLabel>TextArea</ComponentLabel>
                <TextArea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
              </ComponentContainer>
              <ComponentContainer>
                <ComponentLabel>Select</ComponentLabel>
                <Select>
                  <option value="toto">
                    Lorem Ipsum
                  </option>
                </Select>
              </ComponentContainer>
              <ComponentContainer>
                <ComponentLabel>TextArea</ComponentLabel>
                <TextArea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
              </ComponentContainer>
              <ComponentContainer>
                <ComponentLabel>FormGroup</ComponentLabel>
                <ComponentLabel>Label</ComponentLabel>
                <ComponentLabel>HelperText</ComponentLabel>
                <FormGroup>
                  <Label>Lorem ipsum</Label>
                  <Input type="text" value="Lorem ipsum dolor sit amet" onChange={() => {}} />
                  <HelperText>Some more description</HelperText>
                </FormGroup>
              </ComponentContainer>
              <ComponentContainer>
                <ComponentLabel>ErrorMessage</ComponentLabel>
                <ErrorMessage>Lorem ipsum dolor sit amet, consectetur adipiscing elit</ErrorMessage>
              </ComponentContainer>
            </section>
          </Card>
        </PageContent>
      </Page>
    </>
  );
};

const CardTitle = styled("h1")(
  tw`text-xl leading-6 font-bold text-gray-900`
);

const ComponentLabel = ({ children }) => (
  <div>&lt;{ children } /&gt;</div>
);

const ComponentContainer = styled("section")(tw`my-8 flex flex-wrap gap-2`);

