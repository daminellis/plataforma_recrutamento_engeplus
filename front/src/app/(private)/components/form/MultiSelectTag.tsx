"use client";

import { InputType } from "@/types/Input";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AppButton } from "../../../../components/ui/button/AppButton";
import { apiClientInstace } from "@/service/axiosClientAuth";
import { Loading } from "../../../../components/ui/Loading";
import { InputLabel } from "@/components/form/InputLabel";

interface BaseData {
  id: number;
  nome: string;
  corTag?: string;
}

interface MultiSelectTagProps extends InputType {
  data: BaseData[];
  textAdd: string;
  routeAdd: string;
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

export const MultiSelectTag = (props: MultiSelectTagProps) => {
  const [data, setData] = useState(props.data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [viewAddModal, setViewAddModal] = useState<boolean>(false);
  const [newTag, setNewTag] = useState({
    id: data.length + 1,
    nome: "",
    corTag: "",
  });

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;
    setSelected(
      typeof value === "string" ? value.split(", ").map(Number) : value
    );
  };

  const handleAddTag = async () => {
    setIsLoading(true);
    await apiClientInstace()
      .post(props.routeAdd, newTag)
      .then(() => {
        setData((prev) => [newTag, ...prev]);
      })
      .finally(() => {
        setIsLoading(false);
        setViewAddModal(false);
      });
  };

  return (
    <div className={props.className}>
      <label
        htmlFor={props.idAndName}
        className="text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>

      <div className="flex gap-2 items-end relative">
        <Select
          name={props.idAndName}
          id={props.idAndName}
          multiple
          value={selected}
          onChange={handleChange}
          placeholder={props.placeholder}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span className="text-gray-400">{props.placeholder}</span>;
            }

            return selected
              .map((tag) => {
                const item = data.find((item) => item.id === tag);
                return item?.nome;
              })
              .join(", ");
          }}
          className="h-10 mt-1"
          MenuProps={MenuProps}
          displayEmpty
          fullWidth
          required
        >
          {data.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              style={{
                backgroundColor: `${item.corTag}33`,
                color: item.corTag,
              }}
            >
              <Checkbox
                checked={selected.includes(item.id)}
                sx={{
                  color: item.corTag,
                  "&.Mui-checked": {
                    color: item.corTag,
                  },
                }}
              />
              <ListItemText primary={item.nome} />
            </MenuItem>
          ))}
        </Select>

        <AppButton
          size="sm"
          color="grayOutline"
          className="h-10"
          onClick={() => setViewAddModal((prev) => !prev)}
          type="button"
        >
          <PlusIcon />
          {props.textAdd}
        </AppButton>

        {viewAddModal && (
          <div className="absolute right-0 top-16 shadow-xl shadow-gray-300 p-5 rounded-lg">
            <InputLabel
              idAndName="nome"
              label="Nome da tag"
              placeholder="Digite como irá aparecer na tag"
              onBlur={(e) =>
                setNewTag((prev) => ({ ...prev, nome: e.target.value }))
              }
            />
            <InputLabel
              idAndName="corTag"
              label="Cor da tag"
              type="color"
              className="mt-2"
              inputClassName="h-14"
              onBlur={(e) =>
                setNewTag((prev) => ({ ...prev, corTag: e.target.value }))
              }
            />

            <AppButton
              type="button"
              className="w-full mt-4"
              onClick={handleAddTag}
            >
              Adicionar {isLoading && <Loading isWhite />}
            </AppButton>
          </div>
        )}
      </div>
    </div>
  );
};
