export class Recommendation {
  public name?: string;
  public description?: string;
  public lastRefreshTime?: string;
  public content?: RecommendationContent;
  public etag?: string;
  public recommenderSubtype?: string;
}

export class RecommendationContent {
  public operationGroups?: RecommendationOperationGroup[]
}

export class RecommendationOperationGroup {
  public operations?: RecommendationOperation[]
}

export class RecommendationOperation {
  public action?: string;
  public resourceType?: string;
  public resource?: string;
  public path?: string;
  public value?: string;
  public valueMatcher?: RecommendationOperationValueMatcher;
}

export class RecommendationOperationValueMatcher {
  public matchesPattern?: string;
}

export class Recommendations {
  public recommendations?: Recommendation[];
}