Instructions: 

* Add unsubscribe logic to the `ItemsMasterComponent`
  * Implement the `OnDestroy` interface and add an `ngOnDestroy()` method
  * Inside your `ngOnDestroy()` method check if an `itemsSub` exists, and if it does, unsubscribe from it.
