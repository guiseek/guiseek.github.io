var App = (function (window, document, $) {

    'use strict';

    var users = [
            'guiseek'
        ],
        userIsDone,
        URL = 'https://api.github.com/';

    return {
        // Init function
        init: function () {
            // this.getGithubUsers();
            this.getGithubRepos();
            this.getGithubMember();
            $('img.lazy').lazyload();
        },
        // Getting and appending users of github
        getGithubUsers: function () {
            var i = 0,
                length = userIsDone = users.length,
                str = '',
                $whoto;

            // Callback function
            function cb(result) {
                userIsDone -= 1;
                str += '<div class="user"><a href="' + result.html_url +
                    '"><img height="80" width="80" class="lazy" data-original="' +
                    result.avatar_url + '"><span>' + result.name +
                    '</span></a></div>';
                // Checking if all callbacks were called
                if (userIsDone === 0) {
                    $whoto = $('#whotofollow .users');
                    $whoto.append(str);
                    $whoto.find('img.lazy').lazyload();
                }
            }

            // Doing the requests for each user
            for (; i < length; i += 1) {
                $.get(URL + 'users/' + users[i] +
                    '?client_id=e471267cc295bcd61662&client_secret=28b32965e10f54dda0071b44a871b0344b69177d',
                    cb);
            }
        },
        // Getting the project's owner
        getGithubRepos: function () {
            var $repos;

            // Callback function
            function cb(result) {
                var i = 0,
                    length = result.length,
                    str = '',
                    obj;

                for (; i < length; i += 1) {
                    obj = result[i];

                    str += '<p class="source link">' +
                    '<a target="_blank" href="' + obj.html_url + '">' +
                    '<span>' + obj.name + '</span>' +
                    '<br>' +
                    '<small>Lang: ' + obj.language + '</small>' +
                    '</a></p>';
                }

                $repos = $('#github .repos');
                $repos.append(str);
                $repos.find('img.lazy').lazyload();
            }

            // Doing the request
            $.get(URL +
                'users/guiseek/repos?type=owner&sort=pushed&direction=description:asc&client_id=e471267cc295bcd61662&client_secret=28b32965e10f54dda0071b44a871b0344b69177d',
                cb)
        },
        // Getting the project's member
        getGithubMember: function () {
            var $repos;

            // Callback function
            function cb(result) {
                var i = 0,
                    length = result.length,
                    str = '',
                    obj;

                for (; i < length; i += 1) {
                    obj = result[i];

                    str += '<p class="source link">' +
                    '<a target="_blank" href="' + obj.html_url + '">' +
                    '<span>' + obj.name + '</span>' +
                    '<br>' +
                    '<small>Lang: ' + obj.language + '</small>' +
                    '</a></p>';
                }

                $repos = $('#github .member');
                $repos.append(str);
                $repos.find('img.lazy').lazyload();
            }

            // Doing the request
            $.get(URL +
                'users/guiseek/repos?type=member&sort=pushed&direction=description:asc&client_id=e471267cc295bcd61662&client_secret=28b32965e10f54dda0071b44a871b0344b69177d',
                cb)
        }
    }

}(window, document, jQuery));

// Starting the Application
App.init();
