/**
 * BRITBOX SEARCH API - 1.0
 * BRITBOX SEARCH API
 *
 * OpenAPI spec version: 1.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/BritboxAPISearchModelsSearchGetResponse', 'model/MassiveSDKModelClassification', 'model/MassiveSDKModelClassificationSummary', 'model/MassiveSDKModelContinueWatchingListData', 'model/MassiveSDKModelContinueWatchingListDataExpansion', 'model/MassiveSDKModelCredit', 'model/MassiveSDKModelEpisodes', 'model/MassiveSDKModelEpisodesItem', 'model/MassiveSDKModelExclusionRule', 'model/MassiveSDKModelItemList', 'model/MassiveSDKModelItemSummary', 'model/MassiveSDKModelListData', 'model/MassiveSDKModelMedia', 'model/MassiveSDKModelOffer', 'model/MassiveSDKModelOptions', 'model/MassiveSDKModelPagination', 'model/MassiveSDKModelPaginationAuth', 'model/MassiveSDKModelPaginationOptions', 'model/MassiveSDKModelPaging', 'model/MassiveSDKModelPerson', 'model/MassiveSDKModelSearchResults', 'model/MassiveSDKModelSeasons', 'model/MassiveSDKModelSeasonsItem', 'model/MassiveSDKModelShow', 'model/MassiveSDKModelTheme', 'model/MassiveSDKModelThemeColor', 'api/SearchApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/BritboxAPISearchModelsSearchGetResponse'), require('./model/MassiveSDKModelClassification'), require('./model/MassiveSDKModelClassificationSummary'), require('./model/MassiveSDKModelContinueWatchingListData'), require('./model/MassiveSDKModelContinueWatchingListDataExpansion'), require('./model/MassiveSDKModelCredit'), require('./model/MassiveSDKModelEpisodes'), require('./model/MassiveSDKModelEpisodesItem'), require('./model/MassiveSDKModelExclusionRule'), require('./model/MassiveSDKModelItemList'), require('./model/MassiveSDKModelItemSummary'), require('./model/MassiveSDKModelListData'), require('./model/MassiveSDKModelMedia'), require('./model/MassiveSDKModelOffer'), require('./model/MassiveSDKModelOptions'), require('./model/MassiveSDKModelPagination'), require('./model/MassiveSDKModelPaginationAuth'), require('./model/MassiveSDKModelPaginationOptions'), require('./model/MassiveSDKModelPaging'), require('./model/MassiveSDKModelPerson'), require('./model/MassiveSDKModelSearchResults'), require('./model/MassiveSDKModelSeasons'), require('./model/MassiveSDKModelSeasonsItem'), require('./model/MassiveSDKModelShow'), require('./model/MassiveSDKModelTheme'), require('./model/MassiveSDKModelThemeColor'), require('./api/SearchApi'));
  }
}(function(ApiClient, BritboxAPISearchModelsSearchGetResponse, MassiveSDKModelClassification, MassiveSDKModelClassificationSummary, MassiveSDKModelContinueWatchingListData, MassiveSDKModelContinueWatchingListDataExpansion, MassiveSDKModelCredit, MassiveSDKModelEpisodes, MassiveSDKModelEpisodesItem, MassiveSDKModelExclusionRule, MassiveSDKModelItemList, MassiveSDKModelItemSummary, MassiveSDKModelListData, MassiveSDKModelMedia, MassiveSDKModelOffer, MassiveSDKModelOptions, MassiveSDKModelPagination, MassiveSDKModelPaginationAuth, MassiveSDKModelPaginationOptions, MassiveSDKModelPaging, MassiveSDKModelPerson, MassiveSDKModelSearchResults, MassiveSDKModelSeasons, MassiveSDKModelSeasonsItem, MassiveSDKModelShow, MassiveSDKModelTheme, MassiveSDKModelThemeColor, SearchApi) {
  'use strict';

  /**
   * BRITBOX_SEARCH_API.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var BritboxSearchApi10 = require('index'); // See note below*.
   * var xxxSvc = new BritboxSearchApi10.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new BritboxSearchApi10.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new BritboxSearchApi10.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new BritboxSearchApi10.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 1.0
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The BritboxAPISearchModelsSearchGetResponse model constructor.
     * @property {module:model/BritboxAPISearchModelsSearchGetResponse}
     */
    BritboxAPISearchModelsSearchGetResponse: BritboxAPISearchModelsSearchGetResponse,
    /**
     * The MassiveSDKModelClassification model constructor.
     * @property {module:model/MassiveSDKModelClassification}
     */
    MassiveSDKModelClassification: MassiveSDKModelClassification,
    /**
     * The MassiveSDKModelClassificationSummary model constructor.
     * @property {module:model/MassiveSDKModelClassificationSummary}
     */
    MassiveSDKModelClassificationSummary: MassiveSDKModelClassificationSummary,
    /**
     * The MassiveSDKModelContinueWatchingListData model constructor.
     * @property {module:model/MassiveSDKModelContinueWatchingListData}
     */
    MassiveSDKModelContinueWatchingListData: MassiveSDKModelContinueWatchingListData,
    /**
     * The MassiveSDKModelContinueWatchingListDataExpansion model constructor.
     * @property {module:model/MassiveSDKModelContinueWatchingListDataExpansion}
     */
    MassiveSDKModelContinueWatchingListDataExpansion: MassiveSDKModelContinueWatchingListDataExpansion,
    /**
     * The MassiveSDKModelCredit model constructor.
     * @property {module:model/MassiveSDKModelCredit}
     */
    MassiveSDKModelCredit: MassiveSDKModelCredit,
    /**
     * The MassiveSDKModelEpisodes model constructor.
     * @property {module:model/MassiveSDKModelEpisodes}
     */
    MassiveSDKModelEpisodes: MassiveSDKModelEpisodes,
    /**
     * The MassiveSDKModelEpisodesItem model constructor.
     * @property {module:model/MassiveSDKModelEpisodesItem}
     */
    MassiveSDKModelEpisodesItem: MassiveSDKModelEpisodesItem,
    /**
     * The MassiveSDKModelExclusionRule model constructor.
     * @property {module:model/MassiveSDKModelExclusionRule}
     */
    MassiveSDKModelExclusionRule: MassiveSDKModelExclusionRule,
    /**
     * The MassiveSDKModelItemList model constructor.
     * @property {module:model/MassiveSDKModelItemList}
     */
    MassiveSDKModelItemList: MassiveSDKModelItemList,
    /**
     * The MassiveSDKModelItemSummary model constructor.
     * @property {module:model/MassiveSDKModelItemSummary}
     */
    MassiveSDKModelItemSummary: MassiveSDKModelItemSummary,
    /**
     * The MassiveSDKModelListData model constructor.
     * @property {module:model/MassiveSDKModelListData}
     */
    MassiveSDKModelListData: MassiveSDKModelListData,
    /**
     * The MassiveSDKModelMedia model constructor.
     * @property {module:model/MassiveSDKModelMedia}
     */
    MassiveSDKModelMedia: MassiveSDKModelMedia,
    /**
     * The MassiveSDKModelOffer model constructor.
     * @property {module:model/MassiveSDKModelOffer}
     */
    MassiveSDKModelOffer: MassiveSDKModelOffer,
    /**
     * The MassiveSDKModelOptions model constructor.
     * @property {module:model/MassiveSDKModelOptions}
     */
    MassiveSDKModelOptions: MassiveSDKModelOptions,
    /**
     * The MassiveSDKModelPagination model constructor.
     * @property {module:model/MassiveSDKModelPagination}
     */
    MassiveSDKModelPagination: MassiveSDKModelPagination,
    /**
     * The MassiveSDKModelPaginationAuth model constructor.
     * @property {module:model/MassiveSDKModelPaginationAuth}
     */
    MassiveSDKModelPaginationAuth: MassiveSDKModelPaginationAuth,
    /**
     * The MassiveSDKModelPaginationOptions model constructor.
     * @property {module:model/MassiveSDKModelPaginationOptions}
     */
    MassiveSDKModelPaginationOptions: MassiveSDKModelPaginationOptions,
    /**
     * The MassiveSDKModelPaging model constructor.
     * @property {module:model/MassiveSDKModelPaging}
     */
    MassiveSDKModelPaging: MassiveSDKModelPaging,
    /**
     * The MassiveSDKModelPerson model constructor.
     * @property {module:model/MassiveSDKModelPerson}
     */
    MassiveSDKModelPerson: MassiveSDKModelPerson,
    /**
     * The MassiveSDKModelSearchResults model constructor.
     * @property {module:model/MassiveSDKModelSearchResults}
     */
    MassiveSDKModelSearchResults: MassiveSDKModelSearchResults,
    /**
     * The MassiveSDKModelSeasons model constructor.
     * @property {module:model/MassiveSDKModelSeasons}
     */
    MassiveSDKModelSeasons: MassiveSDKModelSeasons,
    /**
     * The MassiveSDKModelSeasonsItem model constructor.
     * @property {module:model/MassiveSDKModelSeasonsItem}
     */
    MassiveSDKModelSeasonsItem: MassiveSDKModelSeasonsItem,
    /**
     * The MassiveSDKModelShow model constructor.
     * @property {module:model/MassiveSDKModelShow}
     */
    MassiveSDKModelShow: MassiveSDKModelShow,
    /**
     * The MassiveSDKModelTheme model constructor.
     * @property {module:model/MassiveSDKModelTheme}
     */
    MassiveSDKModelTheme: MassiveSDKModelTheme,
    /**
     * The MassiveSDKModelThemeColor model constructor.
     * @property {module:model/MassiveSDKModelThemeColor}
     */
    MassiveSDKModelThemeColor: MassiveSDKModelThemeColor,
    /**
     * The SearchApi service constructor.
     * @property {module:api/SearchApi}
     */
    SearchApi: SearchApi
  };

  return exports;
}));
