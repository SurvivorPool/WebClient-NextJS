import {
  Box,
  Button,
  Flex,
  Group,
  Loader,
  NumberInput,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ComponentPropsWithoutRef, forwardRef, useMemo, useState } from "react";

import useAdminLeague from "@/hooks/useAdminLeague";

interface ItemProps extends ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Flex direction={"column"}>
          <Text size="sm" fw={700}>
            {label}
          </Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </Flex>
      </Group>
    </div>
  )
);

const CreateLeague = () => {
  const { createLeague, leagueTypes } = useAdminLeague();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">(0);
  const [type, setType] = useState<string | null>(null);
  const [error, setError] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
  });
  const { data: leagueTypesData, isLoading } = leagueTypes;

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      ...error,
      name: "",
    });
    setName(event.currentTarget.value);
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      ...error,
      description: "",
    });
    setDescription(event.currentTarget.value);
  };

  const onPriceChange = (value: number | "") => {
    setError({
      ...error,
      price: "",
    });
    setPrice(value);
  };

  const onTypeChange = (value: string | null) => {
    setError({
      ...error,
      type: "",
    });
    setType(value);
  };

  const onCreateConfirm = async () => {
    if (!name) {
      setError({
        ...error,
        name: "League name is required",
      });
    }

    if (!description) {
      setError({
        ...error,
        description: "League description is required",
      });
    }

    if (price === "") {
      setError({
        ...error,
        price: "League price is required",
      });
    }

    await createLeague.mutate({
      name,
      typeId: type as string,
      description,
      price: parseInt(price as string),
    });
  };

  const isCreateButtonDisabled = useMemo(() => {
    return !!error.name || !!error.description || !!error.price || !!error.type;
  }, [error]);

  return (
    <Flex
      direction={"column"}
      gap={"16px"}
      sx={{
        paddingRight: "8px",
      }}
    >
      <Title order={6}>League Creation</Title>
      <TextInput
        value={name}
        label="League Name"
        onChange={onNameChange}
        error={error.name}
        placeholder="Enter league name..."
        required
      />
      <TextInput
        value={description}
        label="League Description"
        onChange={onDescriptionChange}
        error={error.description}
        placeholder="Enter league description..."
        required
      />
      <NumberInput
        label="Price"
        placeholder="Enter price..."
        value={price}
        onChange={onPriceChange}
        required
        error={error.price}
        formatter={(value) => {
          if (value === "") {
            return "";
          }

          return `$${value}`;
        }}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Select
          label="League Type"
          placeholder="Select league type..."
          value={type}
          onChange={onTypeChange}
          itemComponent={SelectItem}
          data={leagueTypesData?.league_types.map(
            (leagueType: {
              id: string;
              name: string;
              description: string;
            }) => ({
              value: leagueType.id,
              label: leagueType.name,
              description: leagueType.description,
            })
          )}
        />
      )}
      <Box>
        <Button disabled={isCreateButtonDisabled} onClick={onCreateConfirm}>
          Create League
        </Button>
      </Box>
    </Flex>
  );
};

export default CreateLeague;
