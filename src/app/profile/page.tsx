"use client";

import { useState, useEffect } from "react";
//import Image from 'next/image';
import { apiClient } from "@/utils/axiosInstance";

const LOCAL_STORAGE_KEY = "profileImageId";

export default function ProfilePage() {
  const [, setImageId] = useState<string | null>(null);
  const [base64Url, setBase64Url] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load image on mount if ID exists
  useEffect(() => {
    const storedId = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedId) {
      setImageId(storedId);
      fetchBase64Image(storedId);
    }
  }, []);

  const fetchBase64Image = async (id: string) => {
    try {
      const res = await apiClient.get(`/download/${id}`);
      if (!res.data || !res.data.startsWith("data:image")) {
        throw new Error("Invalid base64 image data");
      }
      setBase64Url(res.data);
    } catch (err) {
      console.error("Failed to load image:", err);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setImageId(null);
      setBase64Url(null);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true);

    try {
      const res = await apiClient.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newImageId = res.data;
      localStorage.setItem(LOCAL_STORAGE_KEY, newImageId);
      setImageId(newImageId);
      fetchBase64Image(newImageId);
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Image upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl text-center">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      {base64Url ? (
        <div className="mb-4">
          {/* Using img because base64 doesn't benefit from next/image optimizations */}
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={base64Url}
            alt="Profile"
            className="rounded-full mx-auto w-36 h-36 object-cover"
          />
        </div>
      ) : (
        <div className="mb-4 text-gray-500">No image uploaded</div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isLoading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
      />

      {selectedFile && (
        <p className="mt-2 text-sm text-green-600">
          Selected: {selectedFile.name}
        </p>
      )}
    </div>
  );
}
