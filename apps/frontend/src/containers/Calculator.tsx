import { FoodSection } from "@/containers/FoodSection";
import { HousingSection } from "@/containers/HousingSection";
import { Page } from "@/components/calculator/Page";
import { footprintSchema, type Footprint } from "@shared/schemas/footprint";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const DEFAULT_VALUES: Footprint = {
  housing: {
    household: 1,
    electricityKWhPerYear: 0,
    naturalGasThermsPerYear: 0,
    heatingOilLitresPerYear: 0,
    lpgLitresPerYear: 0,
    wasteKgPerWeek: 0,
    waterLitresPerDay: 0,
  },
  food: {
    redMeat: 0,
    whiteMeat: 0,
    dairy: 0,
    cereals: 0,
    vegetables: 0,
    fruit: 0,
    oils: 0,
    snacks: 0,
    drinks: 0,
  },
};

export function Calculator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Footprint>({
    resolver: zodResolver(footprintSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: Footprint) => {
    console.log(data);
  };

  const results = null;

  if (results) {
    return <p>Results</p>;
  }

  return (
    <Page>
      <Page.Header>
        <Page.Title text="Personal Carbon Footprint" />
        <Page.Description text="Fill in housing and food data to estimate your annual emissions." />
      </Page.Header>

      <Page.Form onSubmit={handleSubmit(onSubmit)}>
        <HousingSection register={register} errors={errors} />
        <FoodSection register={register} errors={errors} />

        <Page.SubmitButton />
      </Page.Form>
    </Page>
  );
}
