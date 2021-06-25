import type {
  IMapper,
  MapperConfiguration,
  MapperTargetValue,
} from "./mapper.interface";

export class CoreMapper<Source, Target> implements IMapper<Source, Target> {
  private targetConfiguration: MapperConfiguration<Source, Target> = {
    fieldConfigurations: {},
  };
  private sourceConfiguration: MapperConfiguration<Target, Source> = {
    fieldConfigurations: {},
  };

  setTargetConfig(
    config: Omit<MapperConfiguration<Source, Target>, "fieldConfigurations">
  ) {
    this.targetConfiguration = { ...this.targetConfiguration, ...config };
  }

  setSourceConfig(
    config: Omit<MapperConfiguration<Target, Source>, "fieldConfigurations">
  ) {
    this.sourceConfiguration = { ...this.sourceConfiguration, ...config };
  }

  ignoreSourceFields(...sourceFields: (keyof Source)[]) {
    this.targetConfiguration.ignoredSourceFields = sourceFields;
  }

  ignoreTargetFields(...targetFields: (keyof Target)[]) {
    this.sourceConfiguration.ignoredSourceFields = targetFields;
  }

  forTarget<TargetField extends keyof Target>(
    targetField: TargetField,
    sourceValue?: MapperTargetValue<Source, Target, TargetField>
  ): CoreMapper<Source, Target> {
    this.targetConfiguration.fieldConfigurations[targetField] =
      sourceValue ?? (targetField as any);

    return this;
  }

  forSource<SourceField extends keyof Source>(
    sourceField: SourceField,
    targetValue?: MapperTargetValue<Target, Source, SourceField>
  ): CoreMapper<Source, Target> {
    this.sourceConfiguration.fieldConfigurations[sourceField] =
      targetValue ?? (sourceField as any);

    return this;
  }

  mapToTarget(source: Source, index?: number, array?: Source[]): Target {
    return this.map(this.targetConfiguration, source, index, array);
  }

  mapToSource(target: Target, index?: number, array?: Target[]): Source {
    return this.map(this.sourceConfiguration, target, index, array);
  }

  mapToTargetList(sources?: Source[]): Target[] | undefined {
    return sources?.map((e, i, array) => this.mapToTarget(e, i, array));
  }

  mapToSourceList(targets?: Target[]): Source[] | undefined {
    return targets?.map((e, i, array) => this.mapToSource(e, i, array));
  }

  private map<TSource, TTarget>(
    configuration: MapperConfiguration<TSource, TTarget>,
    source: TSource,
    index?: number,
    array?: TSource[]
  ): TTarget {
    let target: unknown = {};

    const hasFieldConfig = Object.values(configuration.fieldConfigurations)
      .length;

    this.mapByFieldConfig({ source, target, configuration, index, array });

    if (!hasFieldConfig || configuration.canMapUndefinedFields) {
      this.mapAllFields(source, target, configuration);
    }

    return target as TTarget;
  }

  private mapByFieldConfig<TSource, TTarget>(options: {
    source: TSource;
    target: unknown;
    configuration: MapperConfiguration<TSource, TTarget>;
    index?: number;
    array?: TSource[];
  }): void {
    for (let targetKey in options.configuration.fieldConfigurations) {
      const config =
        options.configuration.fieldConfigurations[targetKey as keyof TTarget];

      (options.target as TTarget)[targetKey as keyof TTarget] =
        typeof config === "function"
          ? config(options.source, options.index, options.array)
          : (options.source[config as keyof TSource] as any);
    }
  }

  private mapAllFields<TSource, TTarget>(
    source: TSource,
    target: unknown,
    configuration: MapperConfiguration<TSource, TTarget>
  ): void {
    for (let key in source) {
      const isIgnoredField = configuration.ignoredSourceFields?.includes?.(key);
      const hasFieldConfig = configuration.fieldConfigurations.hasOwnProperty(
        key
      );

      if (hasFieldConfig || isIgnoredField) continue;

      (target as any)[key] = source[key];
    }
  }
}
