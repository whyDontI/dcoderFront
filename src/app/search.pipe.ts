import { Pipe, PipeTransform } from '@angular/core';
import { Thread } from './models/thread';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(threads: any[], searchTerm: string) {

		if (!threads || !searchTerm) {
			return threads;
    }
		return SearchPipe.filter(threads, searchTerm);
	}

	static filter(threads: any[], searchTerm: string) {

		return threads.filter((thread) => {
			return searchTerm.trim().toLowerCase().split(" ").some(r => thread.title.toLowerCase().indexOf(r) >= 0)

      // return searchTerm.trim().toLowerCase().split(" ").some(r => thread.title.toLowerCase().indexOf(r) >= 0)

    });
	}

}
