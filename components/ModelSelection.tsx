'use client'

import useSWR from "swr";
import Select from 'react-select'
import { useState } from "react";

const fetchModels = () =>( fetch('/api/getEngines').then((res) => res.json()))

function ModelSelection() {
  const { data: models, isLoading } = useSWR('models', fetchModels);

  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo-16k",
  });

  return (
    <div>
      <Select
        className="mt-2 mb-4"
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654] text-black",
        }}
        styles={{
          option: (provided) => ({
            ...provided,
            color: 'black'
          })
        }}
        placeholder={model}
        onChange={(e: any) => setModel(e.value) }
        options={models}
      />
    </div>
  );
}

export default ModelSelection
