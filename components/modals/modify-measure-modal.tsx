"use client";

import { useContext, useEffect, useState } from "react";
import { CalendarIcon, Check, PlusCircle, Zap } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { supabaseClient } from "@/lib/superbase-client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Measurements, addMeasureSchema } from "@/schemas/measurements-schema";
import useMeasurements from "@/app/hooks/use-measurements";
import useModifyMeasureModal from "@/app/hooks/use-modify-measure-modal";
import useSelectedId from "@/app/hooks/use_selected-measure";
import {
  calculateBodyFatFemale,
  calculateBodyFatMale,
} from "@/lib/body-fat-index";
import usePersonalData from "@/app/hooks/use-personal-data";

type MeasurementsFormValues = z.infer<typeof addMeasureSchema>;

// This can come from your database or API.
const defaultValues: Partial<MeasurementsFormValues> = {};

const ModifyMeasureModal = () => {
  const modifyMeasureModal = useModifyMeasureModal();
  const { measurements, setMeasurements } = useMeasurements();
  const { personalData, setPersonalData } = usePersonalData();
  const { selectedId } = useSelectedId();
  const [loading, setLoading] = useState(false);
  const { getToken, userId } = useAuth();

  const form = useForm<MeasurementsFormValues>({
    resolver: zodResolver(addMeasureSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (measurements) {
      const measurementData = measurements.filter(
        (measurement: Measurements) => measurement.id == selectedId
      )[0];
      if (measurementData) {
        form.setValue("weight", measurementData.weight.toString());
        form.setValue("neck", measurementData.neck!.toString());
        form.setValue("chest", measurementData.chest!.toString());
        form.setValue("biceps", measurementData.biceps!.toString());
        form.setValue("abdomen", measurementData.abdomen!.toString());
        form.setValue("waist", measurementData.waist!.toString());
        form.setValue("hip", measurementData.hip!.toString());
        form.setValue("buttocks", measurementData.buttocks!.toString());
        form.setValue("thigh", measurementData.thigh!.toString());
        form.setValue("calf", measurementData.calf!.toString());
        form.setValue("measure_date", new Date(measurementData.measure_date!));
      }
    }
  }, [measurements, selectedId, form]);

  const onSubmit = async (values: MeasurementsFormValues) => {
    let bf = 0;
    if (personalData) {
      if (personalData!.gender == "male") {
        if (values.abdomen && values.neck && personalData?.height) {
          bf = calculateBodyFatMale(
            parseFloat(values.abdomen),
            parseFloat(values.neck),
            personalData.height
          );
        }
      }
      if (personalData!.gender == "female") {
        if (values.waist && values.hip && values.neck && personalData?.height) {
          bf = calculateBodyFatFemale(
            parseFloat(values.waist),
            parseFloat(values.hip),
            parseFloat(values.neck),
            personalData.height
          );
        }
      }
    }
    try {
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken!);

      const { data } = await supabase
        .from("measurements")
        .update({
          bf_index: bf,
          weight: parseFloat(values.weight),
          neck: parseFloat(values.neck!),
          chest: parseFloat(values.chest!),
          biceps: parseFloat(values.biceps!),
          abdomen: parseFloat(values.abdomen!),
          waist: parseFloat(values.waist!),
          hip: parseFloat(values.hip!),
          buttocks: parseFloat(values.buttocks!),
          thigh: parseFloat(values.thigh!),
          calf: parseFloat(values.calf!),
          measure_date: values.measure_date,
        })
        .eq("id", selectedId)
        .select();

      const measurementIndex = measurements!.findIndex(
        (measurement: Measurements) => measurement.id == selectedId
      );
      measurements![measurementIndex] = data![0];
      setMeasurements([...measurements!]);

      toast.success("Registration completed.");
      form.reset();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong...");
    } finally {
      modifyMeasureModal.onClose();
    }
  };

  return (
    <Dialog
      open={modifyMeasureModal.isOpen}
      onOpenChange={modifyMeasureModal.onClose}
    >
      <DialogContent className="fixed h-auto w-5/6 overflow-y-auto border-none rounded-lg shadow-xl dark:shadow-blue-900">
        {/* <ScrollArea className="h-[300px] p-4 md:p-0 md:h-full"> */}
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Add measurements
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 md:space-y-2 font-medium">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 md:px-2"
              >
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Weight [kg]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="neck"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Neck [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="chest"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Chest [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="biceps"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Biceps [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="abdomen"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Abdomen [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="waist"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Waist [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="hip"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Hip [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="buttocks"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Buttocks [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="thigh"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Thigh [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="calf"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Calf [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="measure_date"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Descrizione</FormLabel> */}
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? format(field.value, "PPP")
                                  : format(new Date(), "PPP")}

                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              // disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  // disabled={loading}
                  size="lg"
                  variant="premium"
                  className="w-full"
                >
                  Confirm
                  <PlusCircle className="w-4 h-4 ml-2 " />
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyMeasureModal;
