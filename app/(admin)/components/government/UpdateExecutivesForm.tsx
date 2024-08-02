'use client';

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import Image from "next/image";

const UpdateExecutivesForm = ({ initialExecutives = [], setExecutives }) => {
  const [expandedExecutiveIndex, setExpandedExecutiveIndex] = useState(null);
  const [executives, setInternalExecutives] = useState(initialExecutives);

  useEffect(() => {
    setInternalExecutives(initialExecutives);
  }, [initialExecutives]);

  useEffect(() => {
    setExecutives(executives);
  }, [executives, setExecutives]);

  const toggleExpand = (index) => {
    setExpandedExecutiveIndex(expandedExecutiveIndex === index ? null : index);
  };

  const handleInputChange = (index, field, value) => {
    const updatedExecutives = [...executives];
    updatedExecutives[index][field] = value;
    setInternalExecutives(updatedExecutives);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleInputChange(index, "image", imageUrl);
    }
  };

  const addNewExecutive = () => {
    setInternalExecutives([
      ...executives,
      { name: "", role: "", email: "", image: "", isNew: true },
    ]);
  };

  const handleRemoveExecutive = (index) => {
    const updatedExecutives = executives.filter((_, i) => i !== index);
    setInternalExecutives(updatedExecutives);
  };

  return (
    <div className="w-full">
      {executives.length > 0 &&
        executives.map((item, index) => (
          <div key={index}>
            <div
              className="w-full flex items-center justify-between mb-3 cursor-pointer hover:bg-green-100 p-3 rounded-md"
              onClick={() => toggleExpand(index)}
            >
              <h1 className="font-geistsans font-medium">
                {item.name || "New Executive"}
              </h1>

              <div className="flex items-center gap-2">
                {item.isNew && (
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-500"
                    onClick={() => handleRemoveExecutive(index)}
                  />
                )}
                <div className="rounded-full bg-green-100 text-xs h-5 w-5 flex items-center justify-center">
                  {index + 1}
                </div>
                {expandedExecutiveIndex === index ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </div>

            {expandedExecutiveIndex === index && (
              <div className="w-full mb-4">
                <div className="flex flex-col gap-2">
                  <Input
                    placeholder="Enter Name"
                    value={item.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Enter Role"
                    value={item.role}
                    onChange={(e) =>
                      handleInputChange(index, "role", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Enter Email"
                    value={item.email}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                  />
                  <div className="w-full flex items-center gap-4">
                    {item.image && (
                      <div className="w-[72px] h-[72px] relative rounded-md overflow-hidden">
                        <Image src={item.image} alt="" fill />
                      </div>
                    )}
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(index, e)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      <div className="mt-4">
        {executives.length > 0 && (
          <button className="text-green-500" onClick={addNewExecutive}>
            Add More
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdateExecutivesForm;
