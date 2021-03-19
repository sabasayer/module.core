export type IMapper<Source, Target> = {
  setTargetConfig(
    config: Omit<MapperConfiguration<Source, Target>, "fieldConfigurations">
  ): void;

  setSourceConfig(
    config: Omit<MapperConfiguration<Target, Source>, "fieldConfigurations">
  ): void;

  forTarget<TargetField extends keyof Target>(
    targetField: TargetField,
    sourceValue?: MapperTargetValue<Source, Target, TargetField>
  ): IMapper<Source, Target>;

  forSource<SourceField extends keyof Source>(
    sourceField: SourceField,
    targetValue?: MapperTargetValue<Target, Source, SourceField>
  ): IMapper<Source, Target>;

  mapToTarget(source: Source, index?: number, array?: Source[]): Target;
  mapToSource(target: Target, index?: number, array?: Target[]): Source;
};

type MapperFunc<Source, Target, TargetField extends keyof Target> = (
  source: Source,
  index?: number,
  array?: Source[]
) => Target[TargetField];

export type MapperFieldConfigurations<Source, Target> = {
  [TargetField in keyof Target]?:
    | keyof Source
    | MapperFunc<Source, Target, TargetField>;
} &
  Object;

export type MapperConfiguration<Source, Target> = {
  fieldConfigurations: MapperFieldConfigurations<Source, Target>;
  canMapUndefinedFields?: boolean;
  ignoredSourceFields?: (keyof Source)[];
};

export type MapperTargetValue<
  Source,
  Target,
  TargetField extends keyof Target
> = keyof Source | MapperFunc<Source, Target, TargetField>;
